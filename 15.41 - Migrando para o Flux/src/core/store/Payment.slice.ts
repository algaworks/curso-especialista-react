import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Payment, PaymentService } from 'danielbonifacio-sdk';
import { RootState } from '.';

interface PaymentState {
  paginated: Payment.Paginated;
  fetching: boolean;
  query: Payment.Query;
}

const initialState: PaymentState = {
  fetching: false,
  query: {
    sort: ['scheduledTo', 'desc'],
    page: 0,
    size: 2,
  },
  paginated: {
    page: 0,
    size: 2,
    totalPages: 1,
    totalElements: 0,
    content: [],
  },
};

export const getAllPayments = createAsyncThunk(
  'payment/getAllPayments',
  async (_, { getState, dispatch }) => {
    const {
      payment: { query },
    } = getState() as RootState;
    const paymentPaginated = await PaymentService.getAllPayments(query);
    await dispatch(storeList(paymentPaginated));
  }
);

export const approvePaymentsInBatch = createAsyncThunk(
  'payment/approvePaymentsInBatch',
  async (paymentIds: number[]) => {
    await PaymentService.approvePaymentsBatch(paymentIds);
  }
);

export const setQuery = createAsyncThunk(
  'payment/setQuery',
  async (query: Payment.Query, { dispatch }) => {
    await dispatch(storeQuery(query));
    await dispatch(getAllPayments());
  }
);

const PaymentSlice = createSlice({
  initialState,
  name: 'payment',
  reducers: {
    storeList(state, action: PayloadAction<Payment.Paginated>) {
      state.paginated = action.payload;
    },
    storeQuery(state, action: PayloadAction<Payment.Query>) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    const success = isFulfilled(getAllPayments, approvePaymentsInBatch);
    const error = isRejected(getAllPayments, approvePaymentsInBatch);
    const loading = isPending(getAllPayments, approvePaymentsInBatch);

    builder
      .addMatcher(success, (state) => {
        state.fetching = false;
      })
      .addMatcher(error, (state, action) => {
        state.fetching = false;
      })
      .addMatcher(loading, (state) => {
        state.fetching = true;
      });
  },
});

export const { storeQuery, storeList } = PaymentSlice.actions;

const PaymentReducer = PaymentSlice.reducer;
export default PaymentReducer;
