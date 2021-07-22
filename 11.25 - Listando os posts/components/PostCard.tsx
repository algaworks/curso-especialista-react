import { Post } from "danielbonifacio-sdk";

interface PostCardProps {
  post: Post.Summary;
}

export default function PostCard(props: PostCardProps) {
  return <div>{props.post.title}</div>;
}
