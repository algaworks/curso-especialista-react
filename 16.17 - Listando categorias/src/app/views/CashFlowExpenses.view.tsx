import { Button, Divider, Row, Space, Tooltip, Typography } from 'antd';
import {
  InfoCircleFilled,
  TagOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import EntriesList from '../features/EntriesList';
import useCashFlow from '../../core/hooks/useCashFlow';
import DoubleConfirm from '../components/DoubleConfirm';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useCallback } from 'react';
import EntryCategoryManager from '../features/EntryCategoryManager';
import EntryForm from '../features/EntryForm';
const { Title, Text } = Typography;

export default function CashFlowExpensesView() {
  const { selected, removeEntries } = useCashFlow('EXPENSE');

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const openCategoryModal = useCallback(() => setShowCategoryModal(true), []);
  const closeCategoryModal = useCallback(() => setShowCategoryModal(false), []);

  const openFormModal = useCallback(() => setShowFormModal(true), []);
  const closeFormModal = useCallback(() => setShowFormModal(false), []);

  return (
    <>
      <Modal
        closeIcon={null}
        visible={showCategoryModal}
        onCancel={closeCategoryModal}
        footer={null}
        title={'Gerenciar categorias'}
        destroyOnClose
      >
        <EntryCategoryManager type={'EXPENSE'} />
      </Modal>
      <Modal
        closeIcon={null}
        visible={showFormModal}
        onCancel={closeFormModal}
        footer={null}
        title={'Cadastrar despesa'}
        destroyOnClose
      >
        <EntryForm />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <DoubleConfirm
          popConfirmTitle={`Remover ${
            selected.length > 1
              ? 'entradas selecionadas?'
              : 'entrada selecionada?'
          }`}
          modalTitle={'Remover entradas'}
          modalContent={
            'Remover uma ou mais entradas pode gerar impacto negativo no gráfico de receitas e despesas da empresa. Esta é uma ação irreversível.'
          }
          onConfirm={async () => {
            await removeEntries(selected as number[]);
          }}
        >
          <Button type={'primary'} disabled={!selected.length}>
            Remover
          </Button>
        </DoubleConfirm>
        <Space>
          <Button
            type={'primary'}
            icon={<TagOutlined />}
            onClick={openCategoryModal}
          >
            Categorias
          </Button>
          <Button
            type={'primary'}
            icon={<PlusCircleOutlined />}
            onClick={openFormModal}
          >
            Adicionar despesa
          </Button>
        </Space>
      </Row>
      <Space direction={'vertical'}>
        <Title level={3}>Recuperando entradas do mês de agosto</Title>
        <Space>
          <Text>É possível filtrar lançamentos por mês</Text>
          <Tooltip placement={'right'} title={'Use a coluna Data para filtrar'}>
            <InfoCircleFilled />
          </Tooltip>
        </Space>
      </Space>

      <Divider />

      <EntriesList />
    </>
  );
}
