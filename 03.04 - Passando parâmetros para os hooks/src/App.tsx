import './App.css';
import useCounter from './hooks/useCounter';
import PeopleList from './PeopleList';

function App() {
  const number = useCounter(9)
  return (
    <div className="App">
      { number }
      <PeopleList />
      <PeopleList />
    </div>
  );
}

export default App;
