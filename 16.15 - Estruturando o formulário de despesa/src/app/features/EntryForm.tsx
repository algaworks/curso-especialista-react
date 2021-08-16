import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Divider,
  Space,
  Button,
} from 'antd';
import CurrencyInput from '../components/CurrencyInput';

export default function EntryForm() {
  return (
    <Form layout={'vertical'}>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label={'Descrição'}>
            <Input placeholder={'Pagamento da AWS'} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label={'Categoria'}>
            <Input placeholder={'Pagamento da AWS'} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label={'Montante'}>
            <CurrencyInput onChange={() => null} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label={'Data de entrada'}>
            <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Divider style={{ marginTop: 0 }} />
      <Row justify={'end'}>
        <Space>
          <Button>Cancelar</Button>
          <Button type={'primary'} htmlType={'submit'}>
            Cadastrar despesa
          </Button>
        </Space>
      </Row>
    </Form>
  );
}
