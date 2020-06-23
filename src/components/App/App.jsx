import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import TopNav from '../Navbar/Navbar'
import Home from '../../pages/Home/Home'
import Dashboard from '../../pages/Dashboard/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopNav />
        <Route path="/" exact= {true} component={Home} />
        <Route path="/dashboard" exact= {true} component={Dashboard} />
      </BrowserRouter>
    </>
  )
}

export default App;



