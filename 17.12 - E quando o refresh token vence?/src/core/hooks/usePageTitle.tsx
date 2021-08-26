import { useEffect } from 'react';

export default function usePageTitle(title: string) {
  const BASE_TITLE = 'AlgaNews';
  useEffect(() => {
    document.title = `${title} - ${BASE_TITLE}`;
  }, []); // eslint-disable-line
}
