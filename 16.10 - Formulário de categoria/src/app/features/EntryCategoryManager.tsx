import { Button, Row, Table, Form, Input, Col } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useCallback } from 'react';

export default function EntryCategoryManager(props: {
  type: 'EXPENSE' | 'REVENUE';
}) {
  const { expenses, fetchCategories, revenues } = useEntriesCategories();

  const [showCreationModal, setShowCreationModal] = useState(false);

  const openCreationModal = useCallback(() => setShowCreationModal(true), []);
  const closeCreationModal = useCallback(() => setShowCreationModal(false), []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Modal
        footer={null}
        title={'Adicionar categoria'}
        visible={showCreationModal}
        onCancel={closeCreationModal}
      >
        <CategoryForm />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <Button>Atualizar categorias</Button>
        <Button onClick={openCreationModal}>Adicionar categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary>
        size='small'
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
            render(id: number) {
              return (
                <>
                  <Button
                    danger
                    type={'ghost'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}

function CategoryForm() {
  return (
    <Form layout={'vertical'}>
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
