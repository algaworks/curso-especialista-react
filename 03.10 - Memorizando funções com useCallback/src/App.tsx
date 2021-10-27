import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ScrollableBox, { ScrollableRef } from "./ScrollableBox";

function App() {
  const boxRef = useRef<ScrollableRef>(null);
  const [content, setContent] = useState<string>();
  const [postId, setPostId] = useState(1);

  const fetchData = useCallback(async function () {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const data = await response.json();
    setContent(data.body);
  }, [postId])

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <div className="App">
      <ScrollableBox ref={boxRef} width={120} height={120}>
        <p>{content || "carregando..."}</p>
      </ScrollableBox>
      <button onClick={() => setPostId(2)}>descer</button>
    </div>
  );
}

export default App;
