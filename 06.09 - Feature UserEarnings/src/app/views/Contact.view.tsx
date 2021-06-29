import usePageTitle from "../../core/hooks/usePageTitle"
import DefaultLayout from "../layouts/Default"

export default function Contact () {
  usePageTitle('Contato')
  return <DefaultLayout>
    <h1>Contato</h1>
  </DefaultLayout>
}