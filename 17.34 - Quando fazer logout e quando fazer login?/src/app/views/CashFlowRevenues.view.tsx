import useBreadcrumb from '../../core/hooks/useBreadcrumb';
import EntryCRUD from '../features/EntryCRUD';

export default function CashFlowRevenuesView() {
  useBreadcrumb('Fluxo de caixa/Receitas');
  return <EntryCRUD type={'REVENUE'} />;
}
