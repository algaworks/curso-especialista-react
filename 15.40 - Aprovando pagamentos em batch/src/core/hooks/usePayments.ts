import { Payment, PaymentService } from 'danielbonifacio-sdk';
import { useCallback, useState } from 'react';

export default function usePayments() {
  const [fetchingPayments, setFetchingPayments] = useState(false);
  const [payments, setPayments] = useState<Payment.Paginated>();

  const [approvingPaymentsBatch, setApprovingPaymentsBatch] = useState(false);

  const approvePaymentsBatch = useCallback(async (paymentIds: number[]) => {
    try {
      setApprovingPaymentsBatch(true);
      await PaymentService.approvePaymentsBatch(paymentIds);
    } finally {
      setApprovingPaymentsBatch(false);
    }
  }, []);

  const fetchPayments = useCallback(async (query: Payment.Query) => {
    try {
      setFetchingPayments(true);
      const payments = await PaymentService.getAllPayments(query);
      setPayments(payments);
    } finally {
      setFetchingPayments(false);
    }
  }, []);

  return {
    payments,
    fetchPayments,
    fetchingPayments,
    approvingPaymentsBatch,
    approvePaymentsBatch,
  };
}
