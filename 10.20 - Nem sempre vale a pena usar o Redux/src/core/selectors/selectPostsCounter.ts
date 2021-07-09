import { RootState } from "../store";

export default function selectPostsCounter(state: RootState) {
  return state.post.counter;
}
