import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import HomeView from './views/Home.view';
import UserCreateView from './views/UserCreate.view';
import UserListView from './views/UserList.view';
import PaymentListView from './views/PaymentList.view';
import PaymentCreateView from './views/PaymentCreate.view';
import CashFlowRevenuesView from './views/CashFlowRevenues.view';
import CashFlowExpensesView from './views/CashFlowExpenses.view';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={HomeView} />
        <Route
          path={'/usuarios/criacao'}
          exact
          component={UserCreateView}
        />
        <Route
          path={'/usuarios'}
          exact
          component={UserListView}
        />
        <Route
          path={'/pagamentos'}
          exact
          component={PaymentListView}
        />
        <Route
          path={'/pagamentos/criacao'}
          exact
          component={PaymentCreateView}
        />
        <Route
          path={'/fluxo-de-caixa/despesas'}
          exact
          component={CashFlowExpensesView}
        />
        <Route
          path={'/fluxo-de-caixa/receitas'}
          exact
          component={CashFlowRevenuesView}
        />
      </Switch>
    </BrowserRouter>
  );
}
