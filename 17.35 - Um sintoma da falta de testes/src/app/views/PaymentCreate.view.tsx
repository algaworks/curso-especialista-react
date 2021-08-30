import useBreadcrumb from '../../core/hooks/useBreadcrumb';
import PaymentForm from '../features/PaymentForm';

export default function PaymentCreateView() {
  useBreadcrumb('Pagamentos/Cadastro');
  return (
    <>
      <PaymentForm />
    </>
  );
}
