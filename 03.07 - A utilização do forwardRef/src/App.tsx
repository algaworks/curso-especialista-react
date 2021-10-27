import { useEffect, useRef } from "react";
import "./App.css";
import Button from "./Button";

function App() {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      button.current?.click();
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Button ref={button} title="clique em mim" />
    </div>
  );
}

export default App;
