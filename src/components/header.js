import React, {Component} from 'react';
import Login from './login';

class Header extends Component {
  render(){
    return (
      <div className='header'>
        <div className='main_nav'>
          <div className='logo'>
            <img src="https://csi.20icipp.com/img/static/desktop/brand/f8bet/logo.png"></img>
          </div>
          <h1 className='slogan'>F8BET AUTOBANKING Ver 1.0.9</h1>
          <Login/>
        </div>
      </div>
    )
  }
}

export default Header;
