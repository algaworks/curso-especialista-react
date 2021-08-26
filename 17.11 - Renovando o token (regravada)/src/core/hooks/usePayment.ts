import { Payment, PaymentService, Post } from 'danielbonifacio-sdk';
import { ResourceNotFoundError } from 'danielbonifacio-sdk/dist/errors';
import { useCallback } from 'react';
import { useState } from 'react';

export default function usePayment() {
  const [posts, setPosts] = useState<Post.WithEarnings[]>([]);
  const [payment, setPayment] = useState<Payment.Detailed>();
  const [paymentPreview, setPaymentPreview] = useState<Payment.Preview>();

  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [fetchingPayment, setFetchingPayment] = useState(false);
  const [approvingPayment, setApprovingPayment] = useState(false);
  const [fetchingPaymentPreview, setFetchingPaymentPreview] = useState(false);
  const [schedulingPayment, setSchedulingPayment] = useState(false);

  const [paymentNotFound, setPaymentNotFound] = useState(false);
  const [postsNotFound, setPostsNotFound] = useState(false);

  const fetchPayment = useCallback(async (paymentId: number) => {
    try {
      setFetchingPayment(true);
      const payment = await PaymentService.getExistingPayment(paymentId);
      setPayment(payment);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setPaymentNotFound(true);
        return;
      }
      throw error;
    } finally {
      setFetchingPayment(false);
    }
  }, []);

  const approvePayment = useCallback(async (paymentId: number) => {
    try {
      setApprovingPayment(true);
      await PaymentService.approvePayment(paymentId);
    } finally {
      setApprovingPayment(false);
    }
  }, []);

  const fetchPosts = useCallback(async (paymentId: number) => {
    try {
      setFetchingPosts(true);
      const posts = await PaymentService.getExistingPaymentPosts(paymentId);
      setPosts(posts);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setPostsNotFound(true);
        return;
      }
      throw error;
    } finally {
      setFetchingPosts(false);
    }
  }, []);

  const fetchPaymentPreview = useCallback(
    async (paymentPreview: Payment.PreviewInput) => {
      try {
        setFetchingPaymentPreview(true);
        const preview = await PaymentService.getPaymentPreview(paymentPreview);
        setPaymentPreview(preview);
      } finally {
        setFetchingPaymentPreview(false);
      }
    },
    []
  );

  const schedulePayment = useCallback(async (paymentInput: Payment.Input) => {
    try {
      setSchedulingPayment(true);
      await PaymentService.insertNewPayment(paymentInput);
    } finally {
      setSchedulingPayment(false);
    }
  }, []);

  const clearPaymentPreview = useCallback(() => {
    setPaymentPreview(undefined);
  }, []);

  return {
    fetchPayment,
    fetchPosts,
    approvePayment,
    fetchPaymentPreview,
    fetchingPayment,
    fetchingPosts,
    approvingPayment,
    fetchingPaymentPreview,
    paymentNotFound,
    postsNotFound,
    posts,
    payment,
    paymentPreview,
    clearPaymentPreview,
    schedulePayment,
    schedulingPayment,
  };
}
