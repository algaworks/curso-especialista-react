import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Payment } from 'danielbonifacio-sdk';
import moment, { Moment } from 'moment';
import useUsers from '../../core/hooks/useUsers';

export default function PaymentForm() {
  const [form] = useForm();
  const { editors } = useUsers();
  return (
    <Form<Payment.Input>
      form={form}
      layout={'vertical'}
      onFinish={(form) => {
        console.log(form);
      }}
    >
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Form.Item label={'Editor'} name={['payee', 'id']}>
            <Select
              showSearch
              filterOption={(input, option) => {
                return (
                  option?.children
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  (option?.children as string)
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                );
              }}
            >
              {editors.map((editor) => (
                <Select.Option key={editor.id} value={editor.id}>
                  {editor.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item hidden name={['accountingPeriod', 'startsOn']}>
            <Input hidden />
          </Form.Item>
          <Form.Item hidden name={['accountingPeriod', 'endsOn']}>
            <Input hidden />
          </Form.Item>
          <Form.Item label={'Período'} name={'_accountingPeriod'}>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
              onChange={(date) => {
                if (date !== null) {
                  const [startsOn, endsOn] = date as Moment[];
                  form.setFieldsValue({
                    accountingPeriod: {
                      startsOn: startsOn.format('YYYY-MM-DD'),
                      endsOn: endsOn.format('YYYY-MM-DD'),
                    },
                  });
                } else {
                  form.setFieldsValue({
                    accountingPeriod: {
                      startsOn: undefined,
                      endsOn: undefined,
                    },
                  });
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label={'Agendamento'} name={'scheduledTo'}>
            <DatePicker
              disabledDate={(date) => {
                return (
                  date.isBefore(moment()) ||
                  date.isAfter(moment().add(7, 'days'))
                );
              }}
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
      </Row>
      <Button htmlType='submit'>enviar</Button>
    </Form>
  );
}
