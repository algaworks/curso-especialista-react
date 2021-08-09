import { Payment } from 'danielbonifacio-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as PaymentActions from '../store/Payment.slice';

export default function usePayments() {
  const dispatch = useDispatch();

  const fetching = useSelector((s: RootState) => s.payment.fetching);
  const payments = useSelector((s: RootState) => s.payment.paginated);
  const query = useSelector((s: RootState) => s.payment.query);

  const approvePaymentsInBatch = useCallback(
    (ids: number[]) => dispatch(PaymentActions.approvePaymentsInBatch(ids)),
    [dispatch]
  );

  const fetchPayments = useCallback(
    () => dispatch(PaymentActions.getAllPayments()),
    [dispatch]
  );

  const setQuery = useCallback(
    (query: Payment.Query) => dispatch(PaymentActions.setQuery(query)),
    [dispatch]
  );

  return {
    payments,
    fetching,
    query,
    fetchPayments,
    approvePaymentsInBatch,
    setQuery,
  };
}
