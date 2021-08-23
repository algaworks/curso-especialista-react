import { CashFlow } from 'danielbonifacio-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as CategoryActions from '../store/EntriesCategory.slice';

export default function useEntriesCategories() {
  const dispatch = useDispatch<AppDispatch>();

  const fetching = useSelector((s: RootState) => s.cashFlow.category.fetching);
  const expenses = useSelector((s: RootState) => s.cashFlow.category.expenses);
  const revenues = useSelector((s: RootState) => s.cashFlow.category.revenues);

  const fetchCategories = useCallback(
    () => dispatch(CategoryActions.getCategories()).unwrap(),
    [dispatch]
  );

  const createCategory = useCallback(
    (category: CashFlow.CategoryInput) =>
      dispatch(CategoryActions.createCategory(category)).unwrap(),
    [dispatch]
  );

  const deleteCategory = useCallback(
    (categoryId: number) =>
      dispatch(CategoryActions.deleteCategory(categoryId)).unwrap(),
    [dispatch]
  );

  return {
    expenses,
    revenues,
    fetching,
    fetchCategories,
    createCategory,
    deleteCategory,
  };
}
