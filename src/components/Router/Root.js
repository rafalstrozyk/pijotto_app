import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import User from '../../pages/User';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

import PrivateRoute from './PrivateRoute';

import { routsPathVars } from '../../unchangingVars';

export default function Root() {
  return (
    <Switch>
      <PrivateRoute exact path={routsPathVars.home} component={Home} />
      <PrivateRoute path={routsPathVars.user} component={User} />
      <Route path={routsPathVars.login}>
        <Login />
      </Route>
      <Route path={routsPathVars.register}>
        <Register />
      </Route>
    </Switch>
  );
}
