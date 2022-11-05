import React from 'react'
import waitForElm from '../middlewares/waitForElm'
import Aeapi from '../api/aeapi'
import getHistory from '../controllers/history.controller'
import auto from '../middlewares/automation'
import iconxnct from '../asset/media/images/icons/iconxnct.svg'
import icontongdon from '../asset/media/images/icons/icontongdon.svg'
import icontongxuat from '../asset/media/images/icons/icontongxuat.svg'
import icontiendo from '../asset/media/images/icons/icontiendo.svg'

const Transitions = ()=>{
    return (
      <div className='transition content'>
        <div className='breadCrum'><a href='#'>Trang chủ</a> - <a href='#'>VCB</a> - <a href='#'>Chuyển khoản</a></div>
        <div className='transition-container'>
          <div className='transition-wrapper'>
            <div className='table-header'>
              <div className='table-title'>
                <img src={iconxnct}></img>
                <p>Xác nhận chuyển tiền</p>
              </div>
              <div className='table-statistics-container'>
                <div className='table-statistics'>
                  <div className='title-statistics'>
                    <img src={icontongdon}></img>
                    <p>&nbsp;Tổng đơn</p>
                  </div>
                  <div className='num-statistics'>
                    <h1 id='tongdon'>68</h1>
                    <p>&nbsp;đơn</p>
                  </div>                  
                </div>
                <div className='table-statistics'>
                  <div className='title-statistics'>
                    <img src={icontongxuat}></img>
                    <p>&nbsp;Tổng xuất</p>
                  </div>
                  <div className='num-statistics'>
                    <h1 id='tongxuat'>32</h1>
                    <p>&nbsp;đơn</p>
                  </div>                  
                </div>
                <div className='table-statistics'>
                  <div className='title-statistics'>
                    <img src={icontiendo}></img>
                    <p>&nbsp;Tiến độ</p>
                  </div>
                  <div className='num-statistics'>
                    <h1>47</h1>
                    <p className='person-css'>&nbsp;%</p>
                  </div>                  
                </div>
                <div className='button-start'>
                  <button id='automate'></button>
                </div>
              </div>
            </div>
            <table className='dataTable' cellSpacing={'0px'}>
              <thead>
                <tr>
                  <th>ID KHÁCH HÀNG</th>
                  <th>TÊN KHÁCH HÀNG</th>
                  <th>TÀI KHOẢN</th>
                  <th>NGÂN HÀNG THỤ HƯỞNG</th>
                  <th>SỐ TIỀN CHUYỂN KHOẢN</th>
                  <th>LỜI NHẮN</th>
                  <th>XÁC NHẬN</th>
                </tr>
              </thead>
              <tbody id='dataContain'>
                {/* <tr className='data-row'>
                    <td>356823</td>
                    <td>Lục Tuyết Kỳ</td>
                    <td>119526650025</td>
                    <td>Vietcombank</td>
                    <td>868,650,000</td>
                    <td>Luc Tuyet Ky</td>
                    <td>
                      <button className='transferBtn' data-id='{"withdrawid":"21fea8b0-d702-4272-8efb-7f50412a7152","playerId":"ceshi06","bankAcc":"66110002760502","bankName":"BIDV","bankaccountname":"NGUYEN VAN KHANG","ammount":1000,"mess":"DANG NGUYEN VAN KHANG"}'></button>
                      <button className='cancelBtn' data-id='{"withdrawid":"21fea8b0-d702-4272-8efb-7f50412a7152","playerId":"ceshi06","bankAcc":"66110002760502","bankName":"BIDV","bankaccountname":"NGUYEN VAN KHANG","ammount":1000,"mess":"DANG NGUYEN VAN KHANG"}'></button>
                    </td>
                </tr>  */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}

waitForElm('#automate').then(()=>{
  auto()
})

waitForElm('.main_content').then(()=>{
  let submitForm = document.getElementById('historyFormSubmit')
  submitForm.addEventListener('click', ()=>{
    let starTime = document.getElementById('startTime').value
    let endTime = document.getElementById('endTime').value
    let playerChoices = document.getElementById('playerChoices').value
    let player = document.getElementById('player').value
    if(endTime!='' && starTime!=''){
      getHistory(new Date(starTime).getTime(),new Date(endTime).getTime(),playerChoices,player,0)
    }else{
      alert('Vui lòng nhập ngày tháng')
    }
  })
  if(localStorage.getItem('sessionId')=='error'){
    document.getElementsByClassName('sessionId')[0].style.display='flex'
  }else{
    document.getElementsByClassName('sessionId')[0].style.display='none'
  }
})

waitForElm('#navigation').then(()=>{
  let paginition = document.getElementById('navigation')
  let starTime = document.getElementById('startTime').value
  let endTime = document.getElementById('endTime').value
  let playerChoices = document.getElementById('playerChoices').value
  let player = document.getElementById('player').value
  paginition.addEventListener('change', ()=>{
    console.log(paginition.value)
    if(endTime!='' && starTime!=''){
      getHistory(new Date(starTime).getTime(),new Date(endTime).getTime(),playerChoices,player,(paginition.value*100))
    }else{
      alert('Vui lòng nhập ngày tháng')
    }
  })
})

waitForElm('.main_content').then(()=>{
  Aeapi.transitions()
  document.getElementById('sessionSav').addEventListener('click',()=>{
    localStorage.setItem('sessionId',document.getElementById('sessionValue').value)
  })
})
waitForElm('.transferBtn').then(()=>{
  var transferBtn = document.querySelectorAll('.transferBtn')
  transferBtn.forEach((el)=>{
    el.addEventListener('click',()=>{
      Aeapi.transfer(el)
      console.log(el.getAttribute('data-id'))
    })
  })
})

export default Transitions;
