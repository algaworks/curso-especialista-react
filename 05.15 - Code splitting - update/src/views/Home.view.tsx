import usePageTitle from "../hooks/usePageTitle"

export default function Home () {
  usePageTitle('Home')
  return <div>
    <h1>Home</h1>
  </div>
}