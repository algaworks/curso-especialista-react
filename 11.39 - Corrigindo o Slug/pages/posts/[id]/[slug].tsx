import { Post, PostService } from "danielbonifacio-sdk";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ResourceNotFoundError } from "danielbonifacio-sdk/dist/errors";

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
}

export default function PostPage(props: PostProps) {
  return <div>{props.post?.title}</div>;
}

interface Params extends ParsedUrlQuery {
  id: string;
  slug: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> =
  async ({ params, res }) => {
    try {
      if (!params) return { notFound: true };

      const { id, slug } = params;
      const postId = Number(id);

      if (isNaN(postId)) return { notFound: true };

      const post = await PostService.getExistingPost(postId);

      if (slug !== post.slug) {
        res.statusCode = 301;
        res.setHeader("Location", `/posts/${post.id}/${post.slug}`);
        return { props: {} };
      }

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
