import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([
    'Daniel', 'Thiago', 'Alex',
    'Jão', 'Alex'
  ])

  useEffect(() => {
    console.log('componente foi montado')
    return () => {
      console.log('componente foi desmontado')
    }
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {
            names.map((name, index) => <li key={index}>{name}</li>)
          }
        </ul>
        <button
          onClick={() => {
            setNames([...names, 'jeremias'])
          }}
        >
          adicionar jeremias
        </button>
      </header>
    </div>
  );
}

export default App;
