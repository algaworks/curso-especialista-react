import { Post, PostService } from "danielbonifacio-sdk";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface PostProps {
  post?: Post.Detailed;
  error?: {
    message: string;
  };
}

export default function PostPage(props: PostProps) {
  if (props.error)
    return <div style={{ color: "red" }}>{props.error.message}</div>;
  return <div>{props.post?.title}</div>;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> =
  async ({ params }) => {
    try {
      if (!params) return { notFound: true };

      const { id } = params;
      const postId = Number(id);

      if (isNaN(postId)) return { notFound: true };

      const post = await PostService.getExistingPost(postId);

      return {
        props: {
          post,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          error: {
            message: error.message,
          },
        },
      };
    }
  };
