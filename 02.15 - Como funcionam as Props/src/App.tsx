import { useState } from 'react';
import './App.css';
import Post from './components/Post';
import Sidebar from './components/Sidebar';

function App() {
  const [post, setPost] = useState({
    title: 'Título maneiro',
    content: 'Lorem Ipsum dolor sit amet'
  })

  // setTimeout(() => {
  //   setPost({
  //     title: 'Título maneiro2222',
  //     content: 'Lorem Ipsum dolor sit amet'
  //   })
  // }, 5000)

  return (
    <div className="App">
      <header className="App-header">
        <Sidebar post={post} />
        <Post post={post} totalComments={12} />
      </header>
    </div>
  );
}

export default App;
