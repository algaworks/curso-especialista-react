import { Post } from "danielbonifacio-sdk";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectPaginatedPosts from "../selectors/selectPaginatedPosts";
import selectPostsFetching from "../selectors/selectPostsFetching";
import * as PostActions from "../store/Post.slice";

export default function usePosts() {
  const dispatch = useDispatch();

  const paginatedPosts = useSelector(selectPaginatedPosts);
  const loading = useSelector(selectPostsFetching);

  const fetchPosts = useCallback(
    async function (query: Post.Query) {
      dispatch(PostActions.fetchPosts(query));
    },
    [dispatch]
  );

  return {
    paginatedPosts,
    loading,
    fetchPosts,
  };
}
