import React, {useEffect, useState} from 'react'
import './Login.css'
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

function Login() {

  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const register = (e) => {
    if(!name){
      return alert("Please enter a full name");
    }
    auth.createUserWithEmailAndPassword(email, password)
    .then((userAuth) => { userAuth.user.updateProfile({
        displayName: name,
        photoURL: profilePic,

    })
    .then(() => {
      dispatch(login({
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: name,
        photoURL: profilePic
      }));
    });
    }).catch(error => {alert(error)} )
  };

  const loginToApp = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then(userAuth => {
      dispatch(login(
        {
          email: userAuth.user.email,
          password: userAuth.user.password,
          displayName: userAuth.user.displayName,
          photoURL: userAuth.user.photoURL
        }
      ))
    }).catch(error => alert(error))
  };

  return (
    <div className='login'>
        <div className='login__container'>
        <img src="https://1000logos.net/wp-content/uploads/2017/03/Linkedin-Logo.png" alt="" />
        <form>

            <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Full Name (required if registering' />

            <input 
            type="text" 
            value={profilePic}
            onChange={e => setProfilePic(e.target.value)}
            placeholder='Profile pic URL (optional)' />

            <input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email' />

            <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password' />

            <button 
            onClick={loginToApp} 
            className='singin__btn' 
            type='submit'>Sign In</button>

        </form>

        <p>Not a memeber ?
            <span onClick={register} className='login__register'>Register Now</span>
        </p>
        </div>
        
    </div>
  )
}

export default Login