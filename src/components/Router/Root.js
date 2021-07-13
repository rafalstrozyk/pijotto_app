import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

export default function Root() {
  return (
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}
