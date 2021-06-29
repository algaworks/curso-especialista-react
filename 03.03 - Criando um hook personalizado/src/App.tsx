import './App.css';
import useCounter from './hooks/useCounter';

function App() {
  const number = useCounter()
  return (
    <div className="App">
      { number }
    </div>
  );
}

export default App;
