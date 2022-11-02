import React from 'react'
import waitForElm from '../middlewares/waitForElm'
import Aeapi from '../api/aeapi'
import { useState, useEffect } from 'react'
import boUserImage from '../asset/media/images/user/bouser.png'

const Login = ()=>{
    const [username,setUsername] = useState(0)
    useEffect(()=>{
      setUsername(localStorage.getItem('bouser'))
    })
    return (
      <div className='account-info'>
        <div className='user-info'>
          <div className=''>
            <img src={boUserImage} width={'30px'} height={'30px'}></img>
          </div>
          <div className='ae-username'>
            {username}
          </div>
        </div>
        <div className='formField'>
          <label>Vui Lòng Nhập Mã Token:</label>
          <div className='login-input'>
            <input type={'text'} id={'token'} placeholder='token'></input>
            <button type={'submit'} id={'loginBtn'}>Submit</button>
          </div>
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