import { Col, Row, Typography } from 'antd';
import { useState } from 'react';
import './index.css';

const { Title, Paragraph } = Typography;

function App() {
  const [str, setStr] = useState('Daniel Bonifacio');

  return (
    <div>
      <Row gutter={8} justify={'center'}>
        <Col span={12}>
          <Title>Título de nível 1</Title>
          <Title level={2}>Título de nível 2</Title>
          <Title level={3}>Título de nível 3</Title>
          <Title level={4}>Título de nível 4</Title>
          <Title level={5}>Título de nível 5</Title>
        </Col>
        <Col span={12}>
          <Paragraph editable={{ onChange: setStr }}>
            {str}
          </Paragraph>
          <Paragraph ellipsis={{ rows: 3 }}>
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Deleniti perferendis, eligendi
            repudiandae voluptate cumque necessitatibus
            earum voluptatum. Eveniet modi doloribus veniam
            amet exercitationem? Facilis aspernatur vel
            inventore debitis nulla praesentium libero a
            omnis nostrum repellendus consequatur,
            voluptates sed totam repellat modi, vero cumque
            officia voluptas temporibus eligendi, sapiente
            ex necessitatibus impedit! Voluptatem dolores
            consequuntur expedita, fugiat culpa, vitae
            sapiente accusantium quod sint nam doloremque
            provident eius fugit totam minus voluptate quia.
            Doloribus incidunt porro quidem mollitia minima
            quibusdam repellendus, est assumenda at eum
            laboriosam explicabo eligendi dolorem provident
            eos esse sit nobis sapiente voluptas unde
            delectus obcaecati! Dolorem, veritatis
            molestias!
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}

export default App;
