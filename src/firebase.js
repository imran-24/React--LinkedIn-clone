import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDBLdFD0CKIeqgYzXjyzYVgoVLZHGTNLQo",
    authDomain: "linked-in-clone-42816.firebaseapp.com",
    projectId: "linked-in-clone-42816",
    storageBucket: "linked-in-clone-42816.appspot.com",
    messagingSenderId: "467140745293",
    appId: "1:467140745293:web:7a3c0e6d96a09933222404"
  };

// connets everything
const firebaseApp = firebase.initializeApp(firebaseConfig);
// get the database 
const db = firebaseApp.firestore();
// authentication 
const auth = firebase.auth();

export { db, auth};