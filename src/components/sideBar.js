import React from 'react'
import vcbLogo from '../asset/media/images/brands/logo/vcb.webp'
import bidvLogo from '../asset/media/images/brands/logo/bidv.png'
import viettinLogo from '../asset/media/images/brands/logo/viettin.png'
import waitForElm from '../middlewares/waitForElm'
import bankLogin from '../api/bankLogin'
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
        <div className='sidebarContent'>
          <div className='bankLogin'>
            <div className='bankInfo'>
              <div className='bankLogo'></div>
              <div className='bankAccount'>
                <h2>{user}</h2>
                <table className='tableOfInfo' cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td className='title'>Device:</td>
                      <td className='loginContent'>{device}</td>
                    </tr>
                    <tr>
                      <td className='title'>Ngân hàng:</td>
                      <td className='loginContent'>Vietin</td>
                    </tr>
                    <tr>
                      <td className='title'>Thẻ Xuất:</td>
                      <td className='loginContent'>{bank}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='bank'></div>
            </div>
            <button className='logout'>Log Out</button>
            <div className='bankLoginForm'>
              <label>Tên Đăng Nhập</label>
              <input type={'text'} id='bankUsername'></input>
              <label>Tên Đăng Nhập</label>
              <input type={'password'} id='bankPassword'></input>
              <button className='bankLoginSubmit'>Submit</button>
            </div>
          </div>
          <div className='bank'>
            <h3><img src={viettinLogo} width='30px' height={'30px'}></img>Vietin Bank</h3>
            <div className='appendContent'>
              <a href='/' target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="20px" width="20px" preserveAspectRatio="xMidYMid meet" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>Chuyển khoản</a>
              <a href='/billing'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="20px" width="20px" preserveAspectRatio="xMidYMid meet" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>Thống Kê</a>
            </div>
          </div>
          <div className='bank'>
            <h3><img src={bidvLogo} width='30px' height={'30px'}></img>BIDV</h3>
            <div className='appendContent'>
              <a href='https://f8betautobankingbidv.web.app/' target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="20px" width="20px" preserveAspectRatio="xMidYMid meet" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>Chuyển khoản</a>
              <a href='https://f8betautobankingbidv.web.app/billing'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="20px" width="20px" preserveAspectRatio="xMidYMid meet" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>Thống Kê</a>
            </div>
          </div>
          <div className='bank'>
            <h3><img src={vcbLogo} width='30px' height={'30px'}></img>Vietcombank</h3>
            <div className='appendContent'>
              <a href='https://f8betbankautomation.web.app/'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="20px" width="20px" preserveAspectRatio="xMidYMid meet" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>Chuyển khoản</a>
              <a href='https://f8betbankautomation.web.app/billing'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="20px" width="20px" preserveAspectRatio="xMidYMid meet" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>Thống Kê</a>
            </div>
          </div>
        </div>
      </div>
    )
}

waitForElm('.bankLogin').then(()=>{
  document.getElementsByClassName('bankLoginSubmit')[0].addEventListener('click', function(){
    let user = document.getElementById('bankUsername').value
    let password = document.getElementById('bankPassword').value
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

waitForElm('.sidebarContent').then(()=>{
  if(!localStorage.getItem('sideCollapse')){
    localStorage.setItem('sideCollapse',"true")
  }
  if(localStorage.getItem('sideCollapse')=="true"){
    document.getElementsByClassName('sidebarContent')[0].style.width='15%'
    document.getElementsByClassName('main_content')[0].style.width='85%'
    document.getElementsByClassName('main_content')[0].style.marginLeft='15%'
  }else{
    document.getElementsByClassName('sidebarContent')[0].style.width='0%'
    document.getElementsByClassName('main_content')[0].style.width='100%'
    document.getElementsByClassName('main_content')[0].style.marginLeft='0%'
  }
  document.getElementsByClassName('logo')[0].addEventListener('click',function(){
    console.log('hello')
    if(localStorage.getItem('sideCollapse')=="true"){
      document.getElementsByClassName('sidebarContent')[0].style.width='0%'
      document.getElementsByClassName('main_content')[0].style.width='100%'
      document.getElementsByClassName('main_content')[0].style.marginLeft='0%'
      localStorage.setItem('sideCollapse','false')
    }else{
      document.getElementsByClassName('sidebarContent')[0].style.width='15%'
      document.getElementsByClassName('main_content')[0].style.width='85%'
      document.getElementsByClassName('main_content')[0].style.marginLeft='15%'
      localStorage.setItem('sideCollapse','true')
    }
  })
})

export default Sidebar;
