import { useRef } from 'react';
import './App.css';
import ScrollableBox, { ScrollableRef } from './ScrollableBox';

function App() {
  const boxRef = useRef<ScrollableRef>(null)

  return (
    <div className="App">
      <ScrollableBox ref={boxRef} width={120} height={120}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus vero beatae autem nostrum! Animi quas illum tempore aperiam eos, dolorum qui magni odio labore, libero voluptatibus dolorem quia laborum in similique doloribus quaerat porro repellat nobis alias voluptatem ducimus. Temporibus amet deserunt rem qui, iusto a quibusdam id asperiores. Porro facere, similique dignissimos voluptates facilis iure fuga voluptas laborum laboriosam quaerat magni placeat ipsum soluta aut laudantium error esse ad veniam possimus modi! Fugiat, est! Odio minus fugiat laboriosam atque omnis vel, aliquid maiores consequatur, itaque repellat iusto dignissimos ducimus ab dolores sapiente. Reprehenderit, possimus. Excepturi id, architecto iste dignissimos assumenda, minus ullam earum doloribus quia consequatur laborum dolorem. Minima quia aliquam facilis earum voluptas! Dolores, recusandae molestias veritatis sunt reprehenderit soluta doloremque? Sint, atque. Iure natus illo modi voluptates architecto distinctio magni quibusdam reprehenderit, dolore nihil possimus ducimus! Quaerat nesciunt iusto perspiciatis dolorem harum odio ratione cumque ducimus in est saepe esse atque corporis, ullam inventore provident, qui possimus ipsa voluptatum quas? Libero possimus suscipit aut rerum facilis. Est laborum dolores placeat similique soluta, iusto earum, eos blanditiis voluptatibus error asperiores nisi et corporis natus aperiam, accusantium ex illo. Minima optio maxime distinctio est corrupti earum provident cum magnam.</p>
      </ScrollableBox>
      <button onClick={() => boxRef.current?.scrollToBottom()}>
        descer
      </button>
    </div>
  );
}

export default App;
