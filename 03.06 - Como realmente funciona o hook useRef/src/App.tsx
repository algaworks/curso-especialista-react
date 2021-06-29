import { useEffect, useRef } from 'react';
import './App.css';
import useCounter from './hooks/useCounter';
import PeopleList from './PeopleList';

function App() {
  const number = useCounter(9)
  // const counter = { current: 2 }
  const counter = useRef(2)
  const div = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (div.current) {
      div.current.style.backgroundColor = 'green'
    }
  }, [])

  return (
    <div className="App" ref={div}>
      { number }
      <div style={{ backgroundColor: 'peachpuff' }}>
        { counter.current }
      </div>
      <PeopleList />
      <PeopleList />
    </div>
  );
}

export default App;
