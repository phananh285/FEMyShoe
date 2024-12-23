import React, { useState } from 'react';
import './ConfirmLogout.css';
import fetchAPI from './config/axiosConfig.js';

const API_URL = "/auth/login";

const Logout= () => {

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Xác nhận đăng xuất ?</h2>
          
          <div className="button-group">
            <button type="button" className="login-button">
              Đăng Xuất
            </button>
  
            <button 
              type="button" 
              className="login-button" 
              onClick={() => window.location.href = '/demos/admin-templates/datta-able/react/free/ProductStat'}>
              Quay Lại
            </button>
          </div>
        </div>
      </div>
    </section>
  );
  
  
};

export default Logout;