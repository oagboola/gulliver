import React, { useContext, useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import TopNav from '../Navbar/Navbar'
import Home from '../../pages/Home/Home'
import Dashboard from '../../pages/Dashboard/Dashboard'
import UserContext from '../../contexts/UserContext';
import { FirebaseContext } from '../Firebase';
import AppRoutes from '../AppRoutes/AppRoutes';

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL, uid} = user;
        setCurrentUser({displayName, email, photoURL, uid})
      } else {
        // console.log('user not signed in')
      }
    })
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <TopNav />
          <Route path="/" exact= {true} component={Home} />
          <Route path="/dashboard" exact= {true} component={Dashboard} />
        {/*
          <Switch>
            <AppRoutes />
          </Switch>
        */}
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
