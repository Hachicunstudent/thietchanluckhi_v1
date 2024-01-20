import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Input, Button, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
//import '../css/LoginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Đăng nhập thành công, thực hiện các bước cần thiết
      console.log('Đăng nhập thành công');
      navigate('/upload');

    } catch (error) {
      console.error('Đăng nhập thất bại', error.message);
    }
  };

    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">ĐĂNG NHẬP</h2>
          <Form onFinish={handleLogin} className="login-form">
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Nhập email đăng nhập!' }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
  
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Nhập mật khẩu' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className="login-footer">
            <p>Bạn chưa có tài khoản? <a href="#" className="link-success">Đăng kí</a></p>
          </div>
        </div>
      </div>
    );
  };

export default Login;
