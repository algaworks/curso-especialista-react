import { Col, Row, Table } from 'antd';
import { User, UserService } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css';

function App() {
  const [users, setUsers] = useState<User.Summary[]>([]);

  useEffect(() => {
    UserService.getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <Row gutter={8} justify={'center'}>
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
