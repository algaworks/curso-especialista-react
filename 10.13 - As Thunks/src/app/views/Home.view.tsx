import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePageTitle from "../../core/hooks/usePageTitle";
import selectPaginatedPosts from "../../core/selectors/selectPaginatedPosts";
import { addPost, fetchPosts } from "../../core/store/Post.slice";
import ErrorBoundary from "../components/ErrorBoundary";
import PostList from "../features/PostsList";
import UserEarnings from "../features/UserEarnings";
import UserPerformance from "../features/UserPerformance";
import UserTopTags from "../features/UserTopTags";
import DefaultLayout from "../layouts/Default";

const fakePost = {
  id: 42,
  slug: "como-fazer-x-coisas-com-react-js",
  title: "Como fazer X coisas com React.js",
  imageUrls: {
    default:
      "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
    small:
      "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
    medium:
      "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
    large:
      "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg",
  },
  editor: {
    id: 29,
    name: "Daniel Bonifacio",
    avatarUrls: {
      default:
        "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
      small:
        "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
      medium:
        "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
      large:
        "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg",
    },
    createdAt: "2017-03-04T00:12:45Z",
  },
  createdAt: "2020-12-04T00:12:45-03:00",
  updatedAt: "2020-12-05T00:12:45-03:00",
  published: true,
  tags: ["JavaScript"],
  canBePublished: true,
  canBeUnpublished: true,
  canBeDeleted: true,
  canBeEdited: true,
};

export default function Home() {
  usePageTitle("Home");
  const dispatch = useDispatch();
  const paginatedPosts = useSelector(selectPaginatedPosts);

  useEffect(() => {}, [dispatch]);

  return (
    <DefaultLayout>
      <button
        onClick={() => {
          dispatch(fetchPosts({ page: 2 }));
        }}
      >
        disparar acao
      </button>
      {paginatedPosts?.map((post) => (
        <li>{post.title}</li>
      ))}
      <hr />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 32,
        }}
      >
        <UserTopTags />
        <UserEarnings />
      </div>
      <UserPerformance />
      <ErrorBoundary component={"lista de posts"}>
        <PostList />
      </ErrorBoundary>
    </DefaultLayout>
  );
}
