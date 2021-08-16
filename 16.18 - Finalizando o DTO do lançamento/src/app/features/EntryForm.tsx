import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Divider,
  Space,
  Button,
  Select,
} from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import { useCallback } from 'react';
import { Moment } from 'moment';
import CurrencyInput from '../components/CurrencyInput';
import { useForm } from 'antd/lib/form/Form';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';
import { useEffect } from 'react';
import { useMemo } from 'react';

type EntryFormSubmit = Omit<CashFlow.EntryInput, 'transactedOn'> & {
  transactedOn: Moment;
};

interface EntryFormProps {
  type: 'EXPENSE' | 'REVENUE';
}

export default function EntryForm({ type }: EntryFormProps) {
  const [form] = useForm();
  const { revenues, expenses, fetching, fetchCategories } =
    useEntriesCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const categories = useMemo(
    () => (type === 'EXPENSE' ? expenses : revenues),
    [expenses, revenues, type]
  );

  const handleFormSubmit = useCallback(
    (form: EntryFormSubmit) => {
      const newEntryDTO: CashFlow.EntryInput = {
        ...form,
        transactedOn: form.transactedOn.format('DD/MM/YYYY'),
        type,
      };

      console.log(newEntryDTO);
    },
    [type]
  );

  return (
    <Form
      autoComplete={'off'}
      form={form}
      layout={'vertical'}
      onFinish={handleFormSubmit}
    >
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label={'Descrição'}
            name={'description'}
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input placeholder={'Pagamento da AWS'} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label={'Categoria'}
            name={['category', 'id']}
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Select loading={fetching} placeholder={'Selecione uma categoria'}>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label={'Montante'}
            name={'amount'}
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <CurrencyInput
              defaultValue={'R$ 0,00'}
              onChange={(_, value) =>
                form.setFieldsValue({
                  amount: value,
                })
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label={'Data de entrada'}
            name={'transactedOn'}
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
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
