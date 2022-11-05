import React, {Component} from 'react';
import Header from './header';
import Sidebar from './sideBar';
import Transitions from './transitions';
import Billing from './billing';
import Page404 from './404page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import waitForElm from '../middlewares/waitForElm';
import getDevice from '../api/getDevice';
import LoginPopup from './LoginPopup.js';

class MainContent extends Component {
  render(){
    return (
      <div className='wrapper'>
        <Header />
        <div className='main_content'>
          <BrowserRouter>
            <Routes>
                <Route index element={<Transitions />} />
                <Route path="billing" element={<Billing />} />
                <Route path="login" element={<LoginPopup />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

waitForElm('.web-container').then(()=>{
  getDevice()
})

export default MainContent;
