import { useEffect } from "react";

export default function usePageTitle (title: string) {
  const BASE_TITLE = 'AlgaNews'
  useEffect(() => {
    document.title = `${BASE_TITLE} - ${title}`
  }, []) // eslint-disable-line
}