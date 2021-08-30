import { RootState } from "../store";

export default function selectPaginatedPosts(state: RootState) {
  return state.post.paginated;
}
