import useBreadcrumb from '../../core/hooks/useBreadcrumb';
import EntryCRUD from '../features/EntryCRUD';

export default function CashFlowExpensesView() {
  useBreadcrumb('Fluxo de caixa/Despesas');
  return <EntryCRUD type={'EXPENSE'} />;
}
