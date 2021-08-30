import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setBreadcrumb } from '../store/UI.slice';

export default function useBreadcrumb(newBreadcrumb?: string) {
  const dispatch = useDispatch();
  const breadcrumb = useSelector((s: RootState) => s.ui.breadcrumb);

  useEffect(() => {
    if (newBreadcrumb) dispatch(setBreadcrumb(newBreadcrumb.split('/')));
  }, [dispatch, newBreadcrumb]);

  return {
    breadcrumb,
  };
}
