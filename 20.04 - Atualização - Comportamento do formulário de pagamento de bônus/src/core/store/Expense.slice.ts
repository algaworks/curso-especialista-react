import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Key } from 'antd/lib/table/interface';
import { CashFlow, CashFlowService } from 'danielbonifacio-sdk';
import moment from 'moment';
import { RootState } from '.';
import getThunkStatus from '../utils/getThunkStatus';

interface ExpenseState {
  list: CashFlow.EntrySummary[];
  fetching: boolean;
  query: CashFlow.Query;
  selected: Key[];
}

const params = new URLSearchParams(window.location.search);
const yearMonth = params.get('yearMonth');

const initialState: ExpenseState = {
  list: [],
  fetching: false,
  query: {
    type: 'EXPENSE',
    sort: ['transactedOn', 'desc'],
    yearMonth: yearMonth || moment().format('YYYY-MM'),
  },
  selected: [],
};

export const getExpenses = createAsyncThunk(
  'cash-flow/expenses/getExpenses',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { query } = (getState() as RootState).cashFlow.expense;
      const expenses = await CashFlowService.getAllEntries(query);
      await dispatch(storeList(expenses));
    } catch (err) {
      return rejectWithValue({ ...err });
    }
  }
);

export const createExpense = createAsyncThunk(
  'cash-flow/expenses/createExpense',
  async (expense: CashFlow.EntryInput, { dispatch, rejectWithValue }) => {
    try {
      await CashFlowService.insertNewEntry(expense);
      await dispatch(getExpenses());
    } catch (err) {
      return rejectWithValue({ ...err });
    }
  }
);

export const updateExpense = createAsyncThunk(
  'cash-flow/expenses/updateExpense',
  async (
    { entry, entryId }: { entry: CashFlow.EntryInput; entryId: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await CashFlowService.updateExistingEntry(entryId, entry);
      await dispatch(getExpenses());
    } catch (err) {
      return rejectWithValue({ ...err });
    }
  }
);

export const removeExpense = createAsyncThunk(
  'cash-flow/expenses/removeExpense',
  async (expenseId: number, { dispatch, rejectWithValue }) => {
    try {
      await CashFlowService.removeExistingEntry(expenseId);
      await dispatch(getExpenses());
    } catch (err) {
      return rejectWithValue({ ...err });
    }
  }
);

export const removeEntriesInBatch = createAsyncThunk(
  'cash-flow/expenses/removeEntriesInBatch',
  async (ids: number[], { dispatch }) => {
    await CashFlowService.removeEntriesBatch(ids);
    await dispatch(getExpenses());
  }
);

export const setQuery = createAsyncThunk(
  'cash-flow/expenses/setQuery',
  async (query: Partial<CashFlow.Query>, { dispatch }) => {
    await dispatch(_setQuery(query));
    await dispatch(getExpenses());
  }
);

const expenseSlice = createSlice({
  initialState,
  name: 'cash-flow/expenses',
  reducers: {
    storeList(state, action: PayloadAction<CashFlow.EntrySummary[]>) {
      state.list = action.payload;
    },
    setSelectedExpenses(state, action: PayloadAction<Key[]>) {
      state.selected = action.payload;
    },
    setQuery(state, action: PayloadAction<Partial<CashFlow.Query>>) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.fetching = action.payload;
    },
  },
  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getExpenses,
      removeEntriesInBatch,
      createExpense,
      updateExpense,
    ]);

    builder
      .addMatcher(error, (state) => {
        state.fetching = false;
      })
      .addMatcher(success, (state) => {
        state.fetching = false;
      })
      .addMatcher(loading, (state) => {
        state.fetching = true;
      });
  },
});

export const {
  storeList,
  setSelectedExpenses,
  setQuery: _setQuery,
  setFetching,
} = expenseSlice.actions;

const expenseReducer = expenseSlice.reducer;
export default expenseReducer;
