import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Payment } from 'danielbonifacio-sdk';
import moment, { Moment } from 'moment';
import useUsers from '../../core/hooks/useUsers';
import CurrencyInput from '../components/CurrencyInput';

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
        <Divider />
        <Col xs={24} lg={12}>
          todo: payment preview
        </Col>
        <Col xs={24} lg={12}>
          <Form.List name={'bonuses'}>
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field) => {
                    return (
                      <Row gutter={24}>
                        <Col xs={24} lg={14}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'title']}
                            label={'Descrição'}
                          >
                            <Input placeholder={'E.g.: 1 milhão de views'} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} lg={6}>
                          <Form.Item
                            initialValue={0}
                            {...field}
                            name={[field.name, 'amount']}
                            label={'Valor'}
                          >
                            <CurrencyInput
                              onChange={(a, amount) => {
                                form.setFieldsValue({
                                  [field.name]: amount,
                                });
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} lg={4}>
                          <Form.Item label={'Remover'}>
                            <Button
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                              danger
                              size='small'
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    );
                  })}
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Adicionar bônus
                  </Button>
                </>
              );
            }}
          </Form.List>
        </Col>
      </Row>
      <Button htmlType='submit'>enviar</Button>
    </Form>
  );
}
