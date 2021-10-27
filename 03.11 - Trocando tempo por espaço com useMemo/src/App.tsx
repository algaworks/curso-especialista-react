import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import ScrollableBox, { ScrollableRef } from "./ScrollableBox";

function App() {
  const boxRef = useRef<ScrollableRef>(null);
  const [content, setContent] = useState<string>();
  const [postId, setPostId] = useState(1);

  const fetchData = useCallback(
    async function () {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await response.json();
      setContent(data.body);
    },
    [postId]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const data = Array(33_000_000).fill({ foo: "bar" });
  const data = useMemo(() => Array(33_000_000).fill({ foo: "bar" }), []);

  return (
    <div className="App">
      {postId}
      <ScrollableBox ref={boxRef} width={120} height={120}>
        <p>{content || "carregando..."}</p>
      </ScrollableBox>
      <button onClick={() => setPostId(postId + 1)}>somar</button>
    </div>
  );
}

export default App;
