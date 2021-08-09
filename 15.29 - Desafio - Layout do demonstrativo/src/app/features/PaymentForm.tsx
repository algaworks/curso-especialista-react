import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tabs,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Payment } from 'danielbonifacio-sdk';
import moment, { Moment } from 'moment';
import useUsers from '../../core/hooks/useUsers';
import CurrencyInput from '../components/CurrencyInput';

export default function PaymentForm() {
  const [form] = useForm<Payment.Input>();
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
          <Tabs defaultActiveKey={'payment'}>
            <Tabs.TabPane tab={'Demonstrativo'} key={'payment'}>
              <Descriptions
                labelStyle={{ width: 160 }}
                bordered
                size={'small'}
                column={1}
              >
                <Descriptions.Item label={'Editor'}>
                  Daniel Bonifacio
                </Descriptions.Item>
                <Descriptions.Item label={'Período'}>
                  20/07/2021 à 30/07/2021
                </Descriptions.Item>
                <Descriptions.Item label={'Agendamento'}>
                  05/08/2021
                </Descriptions.Item>
                <Descriptions.Item label={'Palavras'}>432</Descriptions.Item>
                <Descriptions.Item label={'Ganhos'}>
                  R$ 23.432,00
                </Descriptions.Item>
                {[1].map((bonus) => (
                  <Descriptions.Item label={`Bônus ${bonus}`}>
                    R$ R$ 15.000,00
                  </Descriptions.Item>
                ))}
                <Descriptions.Item label={'Ganhos'}>
                  R$ 7.432,00
                </Descriptions.Item>
              </Descriptions>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Dados bancários'} key={'bankAccount'}>
              <Descriptions
                bordered
                labelStyle={{ width: 160 }}
                size={'small'}
                column={1}
              >
                <Descriptions.Item label={'Código do Banco'}>
                  341
                </Descriptions.Item>
                <Descriptions.Item label={'Número da conta'}>
                  1065160
                </Descriptions.Item>
                <Descriptions.Item label={'Dígito da conta'}>
                  8
                </Descriptions.Item>
                <Descriptions.Item label={'Agência'}>0001</Descriptions.Item>
                <Descriptions.Item label={'Tipo de conta'}>
                  Conta Corrente
                </Descriptions.Item>
              </Descriptions>
            </Tabs.TabPane>
          </Tabs>
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
                                const { bonuses } = form.getFieldsValue();
                                form.setFieldsValue({
                                  bonuses: bonuses?.map((bonus, index) => {
                                    return index === field.name
                                      ? { title: bonus.title, amount }
                                      : bonus;
                                  }),
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
