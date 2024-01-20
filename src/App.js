import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Question from './pages/Question';
import Infor from './pages/Infor';
import { auth } from './firebase';
import Result from './pages/Result';
import InstallPWAButton  from './components/InstallPWAButton';

//import './App.css'; // hoặc 'App.scss' nếu bạn sử dụng Sass


const Header = ({ isLoggedIn, userEmail }) => {
  if (!isLoggedIn) return null;

  return (
    <div style={{ background: '#f8f8f8', padding: '10px', textAlign: 'right' }}>
      {userEmail}
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setUserEmail(user ? user.email : '');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hoặc bất kỳ thông báo nào bạn muốn hiển thị
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userEmail={userEmail} />

      <div class="flex items-center justify-center">
  <div class="mb-4">
    <InstallPWAButton />
  </div>
</div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={isLoggedIn ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/question" element={isLoggedIn ? <Question /> : <Navigate to="/login" />} />
        <Route path="/result" element={isLoggedIn ? <Result /> : <Navigate to="/login" />} />
        <Route path="/infor" element={isLoggedIn ? <Infor /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/upload" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
