import React from 'react'
import waitForElm from '../middlewares/waitForElm'
import Aeapi from '../api/aeapi'
import getHistory from '../controllers/history.controller'
import auto from '../middlewares/automation'

const Transitions = ()=>{
    return (
      <div className='transition content'>
        <div className='breadCrum'><a href='#'>Trang Chủ</a> - <a href='#'>VCB</a> - <a href='#'>Chuyển Khoản</a></div>
        <div className='table-header'>
          <h2 className='pageTitle'>Xác Nhận Chuyển Tiền</h2>
          <button id='automate'>Start</button>
        </div>
        <div className='transitions'>
          <table className='dataTable' cellSpacing={'0px'}>
            <thead>
              <tr>
                <th>Id Khách Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Tài Khoản</th>
                <th>Ngân hàng Thụ Hưởng</th>
                <th>Số tiền Chuyển Khoản</th>
                <th>Lời Nhắn</th>
                <th>Xác nhận</th>
              </tr>
            </thead>
            <tbody id='dataContain'>

            </tbody>
          </table>
          <table className='tableResult' cellSpacing={0}> 
          <thead>
            <th>Tổng Đơn</th>
            <th>Tổng Xuất</th>
          </thead>
          <tbody>
            <td id='tongdon'>0</td>
            <td id='tongxuat'>0</td>
          </tbody>
        </table>
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
