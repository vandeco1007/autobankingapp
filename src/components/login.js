import React from 'react'
import waitForElm from '../middlewares/waitForElm'
import Aeapi from '../api/aeapi'
import { useState, useEffect } from 'react'
import boUserImage from '../asset/media/images/user/bouser.png'

const Login = ()=>{
    return (
      <div className='formField'>
        <div className='login-input'>
          <input type={'text'} id={'token'} placeholder='Nhập mã token'></input>
        </div>
      </div>
    )
}

waitForElm('#loginBtn').then(()=>{
  document.getElementById('loginBtn').addEventListener('click',function(){
    let token = document.getElementById('token').value
    localStorage.setItem('token',token)
    Aeapi.login(token)
  })
})

export default Login;
// c87e31e15d12409aa45a289f254ea177