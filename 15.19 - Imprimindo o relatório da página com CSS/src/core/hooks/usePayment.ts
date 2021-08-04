import { Payment, PaymentService, Post } from 'danielbonifacio-sdk';
import { ResourceNotFoundError } from 'danielbonifacio-sdk/dist/errors';
import { useCallback } from 'react';
import { useState } from 'react';

export default function usePayment() {
  const [posts, setPosts] = useState<Post.WithEarnings[]>([]);
  const [payment, setPayment] = useState<Payment.Detailed>();

  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [fetchingPayment, setFetchingPayment] = useState(false);

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

  return {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPosts,
    paymentNotFound,
    postsNotFound,
    posts,
    payment,
  };
}
