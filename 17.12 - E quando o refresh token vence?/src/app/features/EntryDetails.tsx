import { Descriptions, Skeleton } from 'antd';
import { CashFlow, CashFlowService } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import transformIntoBrl from '../../core/utils/transformIntoBrl';

interface EntryDetailsProps {
  entryId: number;
}

export default function EntryDetails({ entryId }: EntryDetailsProps) {
  const [entry, setEntry] = useState<CashFlow.EntryDetailed>();
  const [loading, setLoading] = useState(false);

  const fetchEntry = useCallback((id: number) => {
    setLoading(true);
    CashFlowService.getExistingEntry(id)
      .then(setEntry)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchEntry(entryId);
  }, [fetchEntry, entryId]);

  return loading ? (
    <>
      <Skeleton />
      <Skeleton title={false} />
      <Skeleton title={false} />
    </>
  ) : (
    <Descriptions column={1} bordered size={'small'}>
      <Descriptions.Item label={'Descrição'}>
        {entry?.description}
      </Descriptions.Item>
      <Descriptions.Item label={'Categoria'}>
        {entry?.category.name}
      </Descriptions.Item>
      <Descriptions.Item label={'Data de entrada'}>
        {moment(entry?.transactedOn).format('DD/MM/YYYY')}
      </Descriptions.Item>
      <Descriptions.Item label={'Valor'}>
        {transformIntoBrl(entry?.amount)}
      </Descriptions.Item>
      <Descriptions.Item label={'Criado em'}>
        {moment(entry?.createdAt).format('DD/MM/YYYY \\à\\s HH:mm')}
      </Descriptions.Item>
      <Descriptions.Item label={'Criado por'}>
        {entry?.createdBy.name}
      </Descriptions.Item>
      {entry?.createdAt !== entry?.updatedAt && (
        <>
          <Descriptions.Item label={'Atualizado em'}>
            {moment(entry?.updatedAt).format('DD/MM/YYYY \\à\\s HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label={'Atualizado por'}>
            {entry?.updatedBy.name}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
}
