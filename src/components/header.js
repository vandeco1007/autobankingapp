import React, {Component} from 'react';
import bidvlogo from '../asset/media/images/bidvcolor.png'
import Login from './login';

class Header extends Component {
  render(){
    return (
      <div className='header'>
        <div className='toggle-btn'>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19.5" fill="white" stroke="#DADADA"/>
          <path d="M22.06 13L15 20.061L22.06 27.122L24.182 25L19.242 20.061L24.182 15.122L22.06 13Z" fill="#445BFF"/>
          </svg>
        </div>
        <div className='main_nav'>
          <div className='bank-logo'>
            <img src={bidvlogo}></img>
          </div>
        </div>
        <div className='slide-color'></div>
      </div>
    )
  }
}

export default Header;
