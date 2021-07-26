import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import HomeView from './views/Home.view';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}
