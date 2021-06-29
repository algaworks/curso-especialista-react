import usePageTitle from "../../core/hooks/usePageTitle"
import ErrorBoundary from "../components/ErrorBoundary"
import Loading from "../components/Loading"
import PostList from "../features/PostsList"
import UserEarnings from "../features/UserEarnings"
import UserPerformance from "../features/UserPerformance"
import UserTopTags from "../features/UserTopTags"
import DefaultLayout from "../layouts/Default"

export default function Home () {
  usePageTitle('Home')

  return <DefaultLayout>
    <Loading />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 32 }}>
      <UserTopTags />
      <UserEarnings />
    </div>
    <UserPerformance />
    <ErrorBoundary component={'lista de posts'}>
      <PostList />
    </ErrorBoundary>
  </DefaultLayout>
}