// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Thêm dòng này


const firebaseConfig = {
    apiKey: "AIzaSyCmTY1E23andMrelb0724IQptrg2yirWII",
    authDomain: "thietchancra.firebaseapp.com",
    projectId: "thietchancra",
    storageBucket: "thietchancra.appspot.com",
    messagingSenderId: "487309131835",
    appId: "1:487309131835:web:27b4f88fb20d57ff359c1e"
  };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Khởi tạo Firebase Storage

export { app as default, firestore, auth, storage  }; // Export app as the default export
