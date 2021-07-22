import { Col, Input, Row, Table } from 'antd';
import { User, UserService } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User.Summary[]>([]);

  useEffect(() => {
    UserService.getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <Row gutter={8}>
        <Col span={4}>{name}</Col>
        <Col span={4}>
          <Input
            placeholder={'E.g.: Julio Costa'}
            size={'large'}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <Input.TextArea
            placeholder={'E.g.: Julio Costa'}
            size={'large'}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </Col>
        <Col span={24}>
          <Table
            dataSource={users}
            columns={[
              {
                dataIndex: 'name',
                title: 'Nome',
              },
              {
                dataIndex: 'email',
                title: 'Email',
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
