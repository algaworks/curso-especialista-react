import usePageTitle from "../../core/hooks/usePageTitle"
import PostList from "../features/PostsList"
import UserPerformance from "../features/UserPerformance"
import UserTopTags from "../features/UserTopTags"
import DefaultLayout from "../layouts/Default"

export default function Home () {
  usePageTitle('Home')

  return <DefaultLayout>
    <UserTopTags />
    <UserPerformance />
    <PostList />
  </DefaultLayout>
}