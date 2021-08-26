import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

export default function getThunkStatus(
  thunks: [AnyAsyncThunk, ...AnyAsyncThunk[]]
) {
  const success = isFulfilled(...thunks);
  const error = isRejected(...thunks);
  const loading = isPending(...thunks);

  return { success, error, loading };
}
