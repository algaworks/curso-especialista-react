import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Select,
  Skeleton,
  Space,
  Tabs,
  Tooltip,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Payment } from 'danielbonifacio-sdk';
import moment, { Moment } from 'moment';
import { FieldData } from 'rc-field-form/lib/interface';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { InfoCircleFilled } from '@ant-design/icons';
import useUsers from '../../core/hooks/useUsers';
import CurrencyInput from '../components/CurrencyInput';
import usePayment from '../../core/hooks/usePayment';
import transformIntoBrl from '../../core/utils/transformIntoBrl';
import { useState } from 'react';
import AskForPaymentPreview from './AskForPaymentPreview';
import CustomError from 'danielbonifacio-sdk/dist/CustomError';
import { BusinessError } from 'danielbonifacio-sdk/dist/errors';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function PaymentForm() {
  const [form] = useForm<Payment.Input>();
  const { editors, fetchUsers, fetching } = useUsers();
  const history = useHistory();
  const {
    fetchingPaymentPreview,
    clearPaymentPreview,
    paymentPreview,
    fetchPaymentPreview,
    schedulePayment,
    schedulingPayment,
  } = usePayment();
  const [scheduledTo, setScheduledTo] = useState('');
  const [paymentPreviewError, setPaymentPreviewError] = useState<CustomError>();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateScheduleDate = useCallback(() => {
    const { scheduledTo } = form.getFieldsValue();
    setScheduledTo(scheduledTo);
  }, [form]);

  const clearPaymentPreviewError = useCallback(() => {
    setPaymentPreviewError(undefined);
  }, []);

  const getPaymentPreview = useCallback(async () => {
    const { accountingPeriod, bonuses, payee } = form.getFieldsValue();
    if (payee && accountingPeriod) {
      if (payee.id && accountingPeriod.endsOn && accountingPeriod.startsOn) {
        try {
          await fetchPaymentPreview({
            payee,
            accountingPeriod,
            bonuses: bonuses || [],
          });
          clearPaymentPreviewError();
        } catch (err) {
          clearPaymentPreview();
          if (err instanceof BusinessError) {
            setPaymentPreviewError(err);
          }
          throw err;
        }
      } else {
        clearPaymentPreview();
        clearPaymentPreviewError();
      }
    }
  }, [
    form,
    fetchPaymentPreview,
    clearPaymentPreview,
    clearPaymentPreviewError,
  ]);

  const handleFormChange = useCallback(
    ([field]: FieldData[]) => {
      if (Array.isArray(field?.name)) {
        if (
          field.name.includes('payee') ||
          field.name.includes('_accountingPeriod') ||
          field.name.includes('bonuses')
        ) {
          getPaymentPreview();
        }

        if (field.name.includes('scheduledTo')) {
          updateScheduleDate();
        }
      }
    },
    [getPaymentPreview, updateScheduleDate]
  );

  const debouncedHandleFormChange = debounce(handleFormChange, 1000);

  const handleFormSubmit = useCallback(
    async (form: Payment.Input) => {
      const paymentDto: Payment.Input = {
        accountingPeriod: form.accountingPeriod,
        payee: form.payee,
        bonuses: form.bonuses || [],
        scheduledTo: moment(form.scheduledTo).format('YYYY-MM-DD'),
      };

      await schedulePayment(paymentDto);

      notification.success({
        message: 'Pagamento agendado com sucesso',
      });

      history.push('/pagamentos');
    },
    [schedulePayment, history]
  );

  return (
    <Form<Payment.Input>
      form={form}
      layout={'vertical'}
      onFieldsChange={debouncedHandleFormChange}
      onFinish={handleFormSubmit}
    >
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
            label={'Editor'}
            name={['payee', 'id']}
          >
            <Select
              showSearch
              loading={fetching}
              placeholder={
                fetching ? 'Carregando editores...' : 'Selecione um editor'
              }
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
          <Form.Item
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
            label={'Período'}
            name={'_accountingPeriod'}
          >
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
          <Form.Item
            label={'Agendamento'}
            name={'scheduledTo'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
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
          {fetchingPaymentPreview ? (
            <>
              <Skeleton />
              <Skeleton title={false} />
            </>
          ) : !paymentPreview ? (
            <AskForPaymentPreview error={paymentPreviewError} />
          ) : (
            <Tabs defaultActiveKey={'payment'}>
              <Tabs.TabPane tab={'Demonstrativo'} key={'payment'}>
                <Descriptions
                  labelStyle={{ width: 160 }}
                  bordered
                  size={'small'}
                  column={1}
                >
                  <Descriptions.Item label={'Editor'}>
                    {paymentPreview?.payee.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Período'}>
                    <Space>
                      {moment(paymentPreview?.accountingPeriod.startsOn).format(
                        'DD/MM/YYYY'
                      )}
                      <span>à</span>
                      {moment(paymentPreview?.accountingPeriod.endsOn).format(
                        'DD/MM/YYYY'
                      )}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label={'Agendamento'}>
                    {scheduledTo && moment(scheduledTo).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Palavras'}>
                    {paymentPreview?.earnings.words}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Ganhos'}>
                    {transformIntoBrl(paymentPreview?.grandTotalAmount)}
                  </Descriptions.Item>
                  {paymentPreview?.bonuses.map((bonus, index) => (
                    <Descriptions.Item
                      key={index}
                      label={
                        <Space>
                          {`Bônus ${index + 1}`}
                          <Tooltip title={bonus.title}>
                            <InfoCircleFilled
                              style={{ color: '#09f', fontSize: 18 }}
                            />
                          </Tooltip>
                        </Space>
                      }
                    >
                      {transformIntoBrl(bonus.amount)}
                    </Descriptions.Item>
                  ))}
                  <Descriptions.Item label={'Ganhos de posts'}>
                    {transformIntoBrl(paymentPreview?.earnings.totalAmount)}
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
                    {paymentPreview?.bankAccount.bankCode}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Número da conta'}>
                    {paymentPreview?.bankAccount.number}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Dígito da conta'}>
                    {paymentPreview?.bankAccount.digit}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Agência'}>
                    {paymentPreview?.bankAccount.agency}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Tipo de conta'}>
                    {paymentPreview?.bankAccount.type === 'CHECKING'
                      ? 'Conta corrente'
                      : 'Conta poupança'}
                  </Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>
            </Tabs>
          )}
        </Col>
        <Col xs={24} lg={12}>
          <Form.List name={'bonuses'}>
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field) => {
                    return (
                      <Row gutter={24} key={field.name}>
                        <Col xs={24} lg={14}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'title']}
                            label={'Descrição'}
                            rules={[
                              {
                                required: true,
                                message: 'O campo é obrigatório',
                              },
                            ]}
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
                            rules={[
                              {
                                required: true,
                                message: 'O campo é obrigatório',
                              },
                            ]}
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
      <Row justify='end'>
        <Button type={'primary'} htmlType='submit' loading={schedulingPayment}>
          Cadastrar agendamento
        </Button>
      </Row>
    </Form>
  );
}
