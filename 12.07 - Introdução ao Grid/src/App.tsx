import { Col, Row } from 'antd';
import './index.css';

function App() {
  return (
    <div>
      <Row>
        <Col className='Column' span={4}>
          coluna 1
        </Col>
        <Col className='Column' span={4}>
          coluna 2
        </Col>
        <Col className='Column' span={8}>
          coluna 3
        </Col>
        <Col className='Column' span={4}>
          coluna 4
        </Col>
        <Col className='Column' span={6}>
          coluna 5
        </Col>
      </Row>
    </div>
  );
}

export default App;
