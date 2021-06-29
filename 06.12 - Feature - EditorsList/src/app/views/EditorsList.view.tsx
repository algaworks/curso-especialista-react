import DefaultLayout from '../layouts/Default'
import usePageTitle from '../../core/hooks/usePageTitle'
import EditorsList from '../features/EditorsList'

export default function EditorsListView () {
  usePageTitle('Lista de editores')
  
  return <DefaultLayout>
    <EditorsList />
  </DefaultLayout>
}