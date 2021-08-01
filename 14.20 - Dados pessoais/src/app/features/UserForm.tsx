import {
  Col,
  Form,
  Input,
  Row,
  Avatar,
  DatePicker,
  Divider,
  Select,
  Tabs,
} from 'antd';

const { TabPane } = Tabs;

export default function UserForm() {
  return (
    <Form layout={'vertical'}>
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          <Avatar size={128} />
        </Col>
        <Col lg={8}>
          <Form.Item label={'Nome'}>
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item label={'Data de nascimento'}>
            <DatePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item label={'Bio'}>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item label={'Perfil'}>
            <Select placeholder={'Selecione um perfil'}>
              <Select.Option value={'EDITOR'}>
                Editor
              </Select.Option>
              <Select.Option value={'ASSISTANT'}>
                Assistente
              </Select.Option>
              <Select.Option value={'MANAGER'}>
                Gerente
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item label={'Email'}>
            <Input
              type='email'
              placeholder={'E.g.: contato@joao.silva'}
            />
          </Form.Item>
        </Col>
        <Col lg={24}>
          <Divider />
        </Col>

        <Col lg={24}>
          <Tabs defaultActiveKey={'personal'}>
            <TabPane
              key={'personal'}
              tab={'Dados pessoais'}
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item label={'País'}>
                    <Input placeholder={'E.g.: Brasil'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Estado'}>
                    <Input
                      placeholder={'E.g.: Espírito Santo'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Cidade'}>
                    <Input placeholder={'E.g.: Vitória'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Telefone'}>
                    <Input
                      placeholder={'(27) 99999-0000'}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'CPF'}>
                    <Input placeholder={'111.222.333-44'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Preço por palavra'}>
                    <Input placeholder={'0'} />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              key={'bankAccount'}
              tab={'Dados bancários'}
            >
              dados bancários
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Form>
  );
}
