import React, {useEffect} from 'react';

// import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import  Widgets  from './Widgets';

function App() {


  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoUrl
          }));
      }else{
        dispatch(logout());
      }
    })
  },[])

  return (
    <div className="app">
      {/* Header */}
      
      <Header />

      {
        !user ? 
        <Login /> : 
        <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
      }
      


    </div>
  );
}

export default App;
