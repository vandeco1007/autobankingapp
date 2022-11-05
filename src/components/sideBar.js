import React from 'react'
import vcbLogo from '../asset/media/images/brands/logo/vcb.webp'
import bidvLogo from '../asset/media/images/brands/logo/bidv.png'
import viettinLogo from '../asset/media/images/brands/logo/viettin.png'
import waitForElm from '../middlewares/waitForElm'
import bankLogin from '../api/bankLogin'
import logoautobanking from '../asset/media/images/logoautobanking.svg'
import personicon from '../asset/media/images/user/person.svg'
import iconchuyenkhoan from '../asset/media/images/icons/iconchuyenkhoan.svg'
import iconthongke from '../asset/media/images/icons/iconthongke.svg'
import { useEffect, useState } from 'react'

const Sidebar = ()=>{
  const [user, setUser] = useState(0)
  const [device, setDevice] = useState(0)
  const [bank, setBank] = useState(0)
  setTimeout(function(){
    setUser(localStorage.getItem('bouser'))
    setDevice(localStorage.getItem('deviceName'))
    setBank(localStorage.getItem('bankAccount'))
  },100)  
    return (
      <div className='sidebar'>
        <div className='logo-autobanking'>
          <img src={logoautobanking}></img>
        </div>
        <div className='bankLogin'>
          <div className='bankInfo'>      
            <div className='bank-user'>
              <img src={personicon}></img>
            </div>
            <div className='bankAccount'>
              <h2>Xin chào {user}</h2>
              <div className='bankAccount-content'>
                <h3 className='loginContent'>{device}</h3>
                <h2 className='loginContent'>Vietcombank</h2>
                <h3 className='loginContent'>{bank}</h3>
                <h3 className='loginContent'>19552365800125</h3>
                <h3 className='loginContent'>882563</h3>
              </div>
            </div>
          </div>
          {/* <button className='logout'>Log Out</button> */}
          
        </div>
        <div className='bank-title'>Ngân hàng</div>

        <div className='bank'>
          <div className='bank-hover'>
            <div className='vcbwhite'></div>
          </div>
          <div className='appendContent'>
            <a href='/' target="_blank">
              <div className='icon-append-container'>
                <img src={iconchuyenkhoan}></img>
              </div>
              Chuyển khoản
            </a>
            <a href='/' target="_blank">
              <div className='icon-append-container'>
                <img src={iconthongke}></img>
              </div>
              Thống kê
            </a>
          </div>
        </div>
        

        <div className='bank'>
          <div className='bank-hover'>
            <div className='vietinwhite'></div>
          </div>
          <div className='appendContent'>
            <a href='/' target="_blank">
              <div className='icon-append-container'>
                <img src={iconchuyenkhoan}></img>
              </div>
              Chuyển khoản
            </a>
            <a href='/' target="_blank">
              <div className='icon-append-container'>
                <img src={iconthongke}></img>
              </div>
              Thống kê
            </a>
          </div>
        </div>
        <div className='bank'>
          <div className='bank-hover'>
            <div className='bidvwhite'></div>
          </div>
          <div className='appendContent'>
            <a href='/' target="_blank">
              <div className='icon-append-container'>
                <img src={iconchuyenkhoan}></img>
              </div>
              Chuyển khoản
            </a>
            <a href='/' target="_blank">
              <div className='icon-append-container'>
                <img src={iconthongke}></img>
              </div>
              Thống kê
            </a>
          </div>
        </div>
        <div className='app-ver'>
          <p>Version 1.2.1</p>
          <i>F8BET AutoBanking, Reserved</i>
        </div>
      </div>
    )
}

waitForElm('.wrapper').then(()=>{
  document.getElementsByClassName('loginBtn')[0].addEventListener('click', function(){
    let user = document.getElementById('bankUsername').value
    let password = document.getElementById('bankPassword').value
    console.log('hello')
    bankLogin(user,password)
    document.getElementsByClassName('logout')[0].addEventListener('click',function(){
      localStorage.setItem('bankToken','new session')
      localStorage.setItem('deviceName','new session')
      setTimeout(function(){
        window.location.reload()
      },500)
    })
  })

  document.getElementsByClassName('logout')[0].addEventListener('click',function(){
    localStorage.setItem('bankToken','new session')
    localStorage.setItem('deviceName','new session')
    setTimeout(function(){
      window.location.reload()
    },500)
  })
})

waitForElm('.sidebar').then(()=>{
  if(!localStorage.getItem('sideCollapse')){
    localStorage.setItem('sideCollapse',"true")
  }
  if(localStorage.getItem('sideCollapse')=="true"){
    document.getElementsByClassName('sidebar')[0].style.width='18%'
    document.getElementsByClassName('wrapper')[0].style.width='100%'
    document.getElementsByClassName('toggle-btn')[0].style.transform='translate(0%) rotate(0)'

  }else{
    document.getElementsByClassName('sidebar')[0].style.width='0%'
    document.getElementsByClassName('wrapper')[0].style.width='100%'
    document.getElementsByClassName('wrapper')[0].style.marginLeft='0%'
    document.getElementsByClassName('toggle-btn')[0].style.transform='translate(50%) rotate(180deg)'
  }
  document.getElementsByClassName('toggle-btn')[0].addEventListener('click',function(){
    if(localStorage.getItem('sideCollapse')=="true"){
      document.getElementsByClassName('sidebar')[0].style.width='0%'
      document.getElementsByClassName('wrapper')[0].style.width='100%'
      document.getElementsByClassName('toggle-btn')[0].style.transform='translate(50%) rotate(180deg)'

      localStorage.setItem('sideCollapse','false')
    }else{
      document.getElementsByClassName('sidebar')[0].style.width='15.5%'
      document.getElementsByClassName('wrapper')[0].style.width='85%'
      document.getElementsByClassName('toggle-btn')[0].style.transform='translate(0%) rotate(0)'

      localStorage.setItem('sideCollapse','true')
    }
  })
})

export default Sidebar;
