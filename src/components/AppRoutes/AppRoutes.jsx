import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Dashboard/Dashboard';

const routes = [
  { auth: false, exact: true, path: '/', component: Home },
  { auth: true, exact: false, path: '/dashboard', component: Dashboard }
  // {auth: true, exact: true, path: '/profile', component: Profile}
];

const AppRoutes = () => {
  const user = useContext(UserContext);

  if(!user.displayName) {
    return <Redirect to="/" />
  }

  return routes.map(({auth, ...rest}) => {
    if (auth) {
      return <PrivateRoute isLoggedIn={user.displayName} {...rest}/>
    }
    return <Route {...rest}/>
  });
};


const PrivateRoute = ({ exact, path, isLoggedIn, component: Component }) => {
  console.log('is logged in', isLoggedIn)
  if (isLoggedIn) {
    console.log('user is logged in')
    return (
      <Route exact={exact} path={path} component={Component} />
    )
  } else {
    return <Redirect to="/" />
  }
}

export default AppRoutes;
