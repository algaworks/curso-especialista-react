import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import * as EditorActions from "../store/Editor.store";

export default function useEditors() {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.editor.fetching);
  const editorsList = useSelector(
    (state: RootState) => state.editor.editorsList
  );

  const fetchAllEditors = useCallback(
    async function () {
      dispatch(EditorActions.fetchAllEditors());
    },
    [dispatch]
  );

  return {
    loading,
    editorsList,
    fetchAllEditors,
  };
}
