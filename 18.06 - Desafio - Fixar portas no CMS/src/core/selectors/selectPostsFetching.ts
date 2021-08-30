import { RootState } from "../store";

export default function selectPostsFetching(state: RootState) {
  return state.post.fetching;
}
