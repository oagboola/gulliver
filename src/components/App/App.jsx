import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TopNav from '../Navbar/Navbar';
import UserContext from '../../contexts/UserContext';
import { FirebaseContext } from '../Firebase';
import AppRoutes from '../AppRoutes/AppRoutes';

const App = () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setCurrentUser({ displayName, email, photoURL, uid });
        history.push('/dashboard');
      }
    });
  }, [firebase.auth, history]);

  return (
    <UserContext.Provider value={currentUser}>
      <>
        <TopNav signOut={() => setCurrentUser({})} />
        <AppRoutes user={currentUser} />
      </>
    </UserContext.Provider>
  );
};

export default App;
