import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Dashboard/Dashboard';

const routes = [
  { auth: false, exact: true, path: '/', component: Home },
  { auth: true, exact: true, path: '/dashboard', component: Dashboard },
  // {auth: true, exact: true, path: '/profile', component: Profile}
];

const AppRoutes = ({ user }) => {
  const isLoggedIn = user && user.displayName;

  return (
    <Switch>
      {routes.map(({ auth, ...rest }, idx) => {
        if (auth) {
          return <PrivateRoute key={idx} isLoggedIn={isLoggedIn} {...rest} />;
        }
        return <PublicRoutes key={idx} {...rest} />;
      })}
    </Switch>
  );
};

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const PublicRoutes = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AppRoutes;
