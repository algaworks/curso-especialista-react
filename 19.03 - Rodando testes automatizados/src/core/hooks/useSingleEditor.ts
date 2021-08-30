import { User, UserService } from "danielbonifacio-sdk";
import { useCallback, useState } from "react";

export default function useSingleEditor() {
  const [editor, setEditor] = useState<User.EditorDetailed>();

  const fetchEditor = useCallback(async function (editorId: number) {
    UserService.getExistingEditor(editorId).then(setEditor);
  }, []);

  return {
    fetchEditor,
    editor,
  };
}
