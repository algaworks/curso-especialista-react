import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as CategoryActions from '../store/EntriesCategory.slice';

export default function useEntriesCategories() {
  const dispatch = useDispatch();
  const expenses = useSelector((s: RootState) => s.cashFlow.category.expenses);
  const revenues = useSelector((s: RootState) => s.cashFlow.category.revenues);

  const fetchCategories = useCallback(
    () => dispatch(CategoryActions.getCategories()),
    [dispatch]
  );

  return {
    expenses,
    revenues,
    fetchCategories,
  };
}
