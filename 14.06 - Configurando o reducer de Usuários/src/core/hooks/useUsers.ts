import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  const dispatch = useDispatch();

  const users = useSelector(
    (state: RootState) => state.user.list
  );
  const fetching = useSelector(
    (state: RootState) => state.user.fetching
  );

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.getAllUsers());
  }, [dispatch]);

  return {
    fetchUsers,
    users,
    fetching,
  };
}
