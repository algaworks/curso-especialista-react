import { Col, Row, Typography } from 'antd';
import CompanyMetrics from './app/features/CompanyMetrics';
import LatestPosts from './app/features/LatestPosts';

const { Title, Paragraph } = Typography;

function App() {
  return (
    <Row>
      <Col span={24}>
        <Title level={2}>Olá, José Sousa</Title>
        <Paragraph>
          Este é o resumo da empresa nos últimos doze meses
        </Paragraph>
      </Col>
      <Col span={24}>
        <CompanyMetrics />
      </Col>
      <Col span={24}>
        <Title level={3}>Últimos posts</Title>
      </Col>
      <Col span={24}>
        <LatestPosts />
      </Col>
    </Row>
  );
}

export default App;
