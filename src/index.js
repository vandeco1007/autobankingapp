import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.css'
import './style/bill.css'
import Header from './components/header';
import MainContent from './components/mainContent';
import reportWebVitals from './reportWebVitals';
import Aeapi from './api/aeapi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Header />
    <MainContent />
    {/* <Footer /> */}
    <div className='otp-area'>
      <div className='otp-container'>

      </div>
      <div className='notifier'>
        <h2 className='notification'>Có Vấn đề trong quá trình xuất khoản, Vui lòng kiểm tra lại số dư ngân hàng trước khi xuất lại đơn</h2>
        <button className='notify-send'>Xác Nhận</button>
      </div>
    </div>
  </div>
);

reportWebVitals();
