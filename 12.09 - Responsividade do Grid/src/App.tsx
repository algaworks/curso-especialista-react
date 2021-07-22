import { Col, Row } from 'antd';
import './index.css';

function App() {
  return (
    <div>
      <Row gutter={8} justify={'center'}>
        <Col xs={24} sm={16} md={12} lg={8} xl={4} xxl={2}>
          <div className='Column'>coluna 1</div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
