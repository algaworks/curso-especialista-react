import { Col, Row } from 'antd';
import './index.css';

function App() {
  return (
    <div>
      <Row gutter={8} justify={'center'}>
        <Col span={4}>
          <div className='Column'>coluna 1</div>
        </Col>
        <Col span={4}>
          <div className='Column'>coluna 2</div>
        </Col>
        <Col span={8}>
          <div className='Column'>coluna 3</div>
        </Col>
        <Col span={4}>
          <div className='Column'>coluna 4</div>
        </Col>
        <Col span={6}>
          <div className='Column'>coluna 5</div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
