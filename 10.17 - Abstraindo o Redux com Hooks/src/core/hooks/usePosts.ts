import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../sdk/@types";
import selectPaginatedPosts from "../selectors/selectPaginatedPosts";
import selectPostsFetching from "../selectors/selectPostsFetching";
import * as PostActions from "../store/Post.slice";

export default function usePosts() {
  const dispatch = useDispatch();

  const paginatedPosts = useSelector(selectPaginatedPosts);
  const loading = useSelector(selectPostsFetching);

  async function fetchPosts(query: Post.Query) {
    dispatch(PostActions.fetchPosts(query));
  }

  return {
    paginatedPosts,
    loading,
    fetchPosts,
  };
}
