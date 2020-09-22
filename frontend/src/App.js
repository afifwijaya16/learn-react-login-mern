import React from 'react';
import Login from './pages/Login'
import Daftar from './pages/Daftar'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/daftar" component={Daftar} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/resetpassword/:token" component={ResetPassword} />
        </Switch>
    </div>
  );
}

export default App;
