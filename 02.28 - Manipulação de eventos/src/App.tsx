import './App.css';

function App() {
  console.log('renderizou app')
  
  function handleClick (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
  }

  return (
    <div className="App">
      <header className="App-header">

        <form action="/test">

          <button
            type="submit"
            onClick={handleClick}
          >
            Clique em mim
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
