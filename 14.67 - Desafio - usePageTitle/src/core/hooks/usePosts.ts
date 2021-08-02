import { PostService, Post } from 'danielbonifacio-sdk';
import { useCallback, useState } from 'react';

export default function usePosts() {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [posts, setPosts] = useState<Post.Paginated>();

  const fetchUserPosts = useCallback(
    async (userId: number) => {
      setLoadingFetch(true);
      try {
        const posts = await PostService.getAllPosts({
          editorId: userId,
          showAll: true,
        });
        setPosts(posts);
      } finally {
        setLoadingFetch(false);
      }
    },
    []
  );

  const togglePostStatus = useCallback(
    async (post: Post.Summary | Post.Detailed) => {
      setLoadingToggle(true);
      try {
        post.published
          ? await PostService.deactivateExistingPost(
              post.id
            )
          : await PostService.publishExistingPost(post.id);
      } finally {
        setLoadingToggle(false);
      }
    },
    []
  );

  return {
    fetchUserPosts,
    posts,
    togglePostStatus,
    loadingFetch,
    loadingToggle,
  };
}
