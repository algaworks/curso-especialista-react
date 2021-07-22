import { Post, PostService } from "danielbonifacio-sdk";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  ResourceNotFoundError,
  InvalidDataError,
} from "danielbonifacio-sdk/dist/errors";
import CustomError from "danielbonifacio-sdk/dist/CustomError";

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
}

export default function PostPage(props: PostProps) {
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
      if (error instanceof ResourceNotFoundError) {
        return { notFound: true };
      }
      return {
        props: {
          error: {
            message: error.message,
            statusCode: error.data?.status || 500,
          },
        },
      };
    }
  };
