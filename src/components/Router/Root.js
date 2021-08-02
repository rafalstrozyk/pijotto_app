import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import PrivateRoute from './PrivateRoute';

export default function Root() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}
