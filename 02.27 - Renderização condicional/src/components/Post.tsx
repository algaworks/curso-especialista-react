export type PostObject = {
  title: string
  content: string
}

interface PostProps {
  post: PostObject
  totalComments?: number
}

export default function Post (props: PostProps) {
  return <div>
    <h1>{props.post.title}</h1>
    <p>{props.post.content}</p>

    {
      props.totalComments &&
        <span>
          Comentários: {props.totalComments}
        </span>
    }
  </div>
}