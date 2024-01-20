import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Đăng nhập thành công');
      navigate('/upload');
    } catch (error) {
      console.error('Đăng nhập thất bại', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs border-2 rounded-lg p-6">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Thiệt Chẩn Lục Khí-v1</h2>
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">ĐĂNG NHẬP</h2>
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          Bạn chưa có tài khoản? <a href="#" className="text-blue-500 hover:text-blue-800">Đăng kí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
