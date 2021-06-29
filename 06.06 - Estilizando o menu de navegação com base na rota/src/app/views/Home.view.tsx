import usePageTitle from "../../core/hooks/usePageTitle"
import DefaultLayout from "../layouts/Default"

export default function Home () {
  usePageTitle('Home')
  return <DefaultLayout>
    <h1>Home</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse incidunt eligendi iure ut rerum, distinctio quisquam sed culpa minima ipsa.
    </p>
  </DefaultLayout>
}