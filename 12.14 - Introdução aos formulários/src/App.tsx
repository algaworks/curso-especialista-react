import { Col, Row, Form, Input, Button } from 'antd';
import './index.css';

function App() {
  return (
    <div>
      <Form
        onFinish={(form) => {
          console.log(form);
        }}
        layout={'vertical'}
        autoComplete={'off'}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={'Primeiro nome'}
              name={'firstName'}
            >
              <Input placeholder={'Ex.: João'} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={'Último nome'}
              name={['lastName']}
            >
              <Input placeholder={'Ex.: Batista'} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label={'Email'}
              name={'email'}
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório',
                },
              ]}
            >
              <Input
                placeholder={'Ex.: contato@joao.batista'}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type={'primary'} htmlType={'submit'}>
              Enviar dados
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default App;
