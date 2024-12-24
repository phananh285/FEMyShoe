import React, { useState } from 'react';
import './LoginForm.css';
import fetchAPI from '../config/axiosConfig.js';

const API_URL = "/auth/login";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Xử lý logic đăng nhập ở đây (có thể gọi API)
    console.log('username:', username, 'Password:', password);
    try {
      const response = await fetchAPI.post(API_URL, { username, password });
      localStorage.setItem("token",response.token);
      localStorage.setItem("user",JSON.stringify(response.user));
      window.location.href="/";
    } catch (e) {
      console.log(e);
      setErrorMessage('Thông tin đăng nhập không chính xác!');
    }


    // Nếu thành công
    // navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công

    // Xử lý trường hợp thất bại (nếu API trả lỗi)
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Đăng Nhập</h2>
          <form onSubmit={submitForm}>
            {/* Hiển thị lỗi nếu có */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Nhập tài khoản
              </label>
              <input
                type="tel"
                id="username"
                name="username"
                className="form-input"
                placeholder="Nhập số điện thoại"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Mật khẩu */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Nút đăng nhập */}
            <button type="submit" className="login-button">
              Đăng Nhập
            </button>
            {/* Tùy chọn khác */}
            <div className="login-options">
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;