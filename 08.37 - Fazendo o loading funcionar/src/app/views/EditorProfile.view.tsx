import ErrorBoundary from "../components/ErrorBoundary";
import EditorProfile from "../features/EditorProfile";
import DefaultLayout from "../layouts/Default";

function EditorProfileView () {
  return <DefaultLayout>
    <ErrorBoundary>
      <EditorProfile hidePersonalData />
    </ErrorBoundary>
  </DefaultLayout>
}

export default EditorProfileView