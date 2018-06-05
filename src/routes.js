import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './components/Header';
import Test from './components/test';
import Home from './components/Home';
import Profile from './components/Profile';
import Callback from './components/Callback';
import RegisterAttendance from './components/RegisterAttendance';
import Auth from './Auth/Auth';
import history from './history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer/reducer';

const store = createStore(reducer);

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history} component={App}>
          <div>
            <Route path="/" render={(props) => <App auth={auth} {...props} />} />

            <Route path="/test" render={(props) => <Test auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/profile" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/home"/>
              ) : (
                <Profile auth={auth} {...props} />
              )
            )} />

            <Route path="/RegisterAttendance" render={(props) => (
               !auth.isAuthenticated() ? (
                 <Redirect to="/registerattendance"/>
               ) : (
                 <RegisterAttendance auth={auth} {...props} />
               )
             )} />

            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
          </div>
        </Router>
      </Provider>
  );
}
