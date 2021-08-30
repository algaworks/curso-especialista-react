import useBreadcrumb from '../../core/hooks/useBreadcrumb';
import usePageTitle from '../../core/hooks/usePageTitle';
import UserForm from '../features/UserForm';

export default function UserCreateView() {
  usePageTitle('Cadastro de usuário');
  useBreadcrumb('Usuários/Cadastro');
  return (
    <>
      <UserForm />
    </>
  );
}
