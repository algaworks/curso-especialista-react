import {
  Button,
  Row,
  Table,
  Form,
  Input,
  Col,
  notification,
  Popconfirm,
} from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import {
  DeleteOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useCallback } from 'react';
import Forbidden from '../components/Forbidden';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

export default function EntryCategoryManager(props: {
  type: 'EXPENSE' | 'REVENUE';
}) {
  const { xs } = useBreakpoint();
  const { expenses, fetchCategories, fetching, revenues, deleteCategory } =
    useEntriesCategories();

  const [showCreationModal, setShowCreationModal] = useState(false);

  const openCreationModal = useCallback(() => setShowCreationModal(true), []);
  const closeCreationModal = useCallback(() => setShowCreationModal(false), []);

  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetchCategories().catch((err) => {
      if (err?.data?.status === 403) {
        setForbidden(true);
        return;
      }
      throw err;
    });
  }, [fetchCategories]);

  if (forbidden) return <Forbidden />;

  return (
    <>
      <Modal
        footer={null}
        title={'Adicionar categoria'}
        visible={showCreationModal}
        onCancel={closeCreationModal}
        destroyOnClose
      >
        <CategoryForm
          onSuccess={() => {
            closeCreationModal();
            notification.success({
              message: 'Categoria cadastrada com sucesso',
            });
          }}
        />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <Button onClick={fetchCategories} icon={<ReloadOutlined />}>
          {xs ? 'Atualizar' : 'Atualizar categorias'}
        </Button>
        <Button
          onClick={openCreationModal}
          icon={<PlusCircleOutlined />}
          type={'primary'}
        >
          {xs ? 'Adicionar' : 'Adicionar categoria'}
        </Button>
      </Row>
      <Table<CashFlow.CategorySummary>
        size='small'
        rowKey={'id'}
        loading={fetching}
        dataSource={props.type === 'EXPENSE' ? expenses : revenues}
        columns={[
          {
            dataIndex: 'name',
            title: 'Descrição',
          },
          {
            dataIndex: 'totalEntries',
            title: 'Vínculos',
            align: 'right',
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render(id: number, record) {
              return (
                <Popconfirm
                  title={'Remover categoria?'}
                  disabled={!record.canBeDeleted}
                  onConfirm={async () => {
                    await deleteCategory(id);
                    notification.success({
                      message: 'Categoria removida com sucesso',
                    });
                  }}
                >
                  <Button
                    danger
                    type={'ghost'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                    disabled={!record.canBeDeleted}
                  />
                </Popconfirm>
              );
            },
          },
        ]}
      />
    </>
  );
}

function CategoryForm(props: { onSuccess: () => any }) {
  const { onSuccess } = props;

  const { createCategory } = useEntriesCategories();

  const handleFormSubmit = useCallback(
    async (form: CashFlow.CategoryInput) => {
      const newCategoryDTO: CashFlow.CategoryInput = {
        ...form,
        type: 'EXPENSE',
      };

      await createCategory(newCategoryDTO);
      onSuccess();
    },
    [createCategory, onSuccess]
  );

  return (
    <Form layout={'vertical'} onFinish={handleFormSubmit}>
      <Row justify={'end'}>
        <Col xs={24}>
          <Form.Item
            label={'Categoria'}
            name={'name'}
            rules={[
              { required: true, message: 'O nome da categoria é obrigatório' },
            ]}
          >
            <Input placeholder={'E.g.: Infra'} />
          </Form.Item>
        </Col>
        <Button
          type={'primary'}
          htmlType={'submit'}
          icon={<CheckCircleOutlined />}
        >
          Cadastrar categoria
        </Button>
      </Row>
    </Form>
  );
}
