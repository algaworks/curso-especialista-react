import { Col, DatePicker, Form, Row, Select } from 'antd';
import { Payment } from 'danielbonifacio-sdk';
import useUsers from '../../core/hooks/useUsers';

export default function PaymentForm() {
  const { users } = useUsers();
  return (
    <Form<Payment.Input> layout={'vertical'}>
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Form.Item label={'Editor'}>
            <Select>
              {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label={'Período'}>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label={'Agendamento'}>
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
