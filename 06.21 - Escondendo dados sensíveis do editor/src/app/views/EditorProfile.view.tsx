import EditorProfile from "../features/EditorProfile";
import DefaultLayout from "../layouts/Default";

function EditorProfileView () {
  return <DefaultLayout>
    <EditorProfile hidePersonalData />
  </DefaultLayout>
}

export default EditorProfileView