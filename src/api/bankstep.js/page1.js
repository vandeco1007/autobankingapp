const page1 = (data,bank)=>{
  localStorage.setItem('notification','watching...')
  let token = localStorage.getItem('bankToken')
  let device = localStorage.getItem('deviceName')
  setAcc(device,token,data,bank)
}

function setAcc(device,token,data,bank){
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'T:Số tài khoản người nhận',action:\"setText('"+data.bankAcc+"')\"}", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(!result.value.retval){
      setAcc(device,token,data,bank)
    }else{
      fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'T:Ngân hàng nhận',action:\"click\"}", requestOptions)
      .then(response => response.json())
      .then(result =>{
        setBank(device,token,data,bank)
      }).catch(error => console.log('error', error));
    }
  }).catch(error => console.log('error', error));
    //Set amount and message
}

function setBank(device,token,data,bank){
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  setTimeout(function(){
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.edtFinter',action:'setText(\""+bank+"\")'}", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(!result.value.retval){
        setBank(device,token,data,bank)
      }else{
        clickBank(device,token,data,bank)
      }
    })
    .catch(error => console.log('error', error));
  },2000)

}

function clickBank(device,token,data,bank){
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.ivIcon',action:'click'}", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(!result.value.retval){
      clickBank(device,token,data,bank)
    }else{
      next(device,token,data,bank)
    }
  })
  .catch(error => console.log('error', error));
}

function next(device,token,data,bank){
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.tvInterBankNote\",action:\"getText\"}", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(!result.value.retval)
    if(!result.value.retval){
      fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Nội dung\",action:\"getText\"}", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(!result.value.retval)
        if(!result.value.retval){
          next(device,token,data,bank)
        }else{
          ammountNMess(device,token,data,bank)
        }
      }).catch(error => console.log('error', error));
    }else{
      document.getElementsByClassName('otp-container')[0].style.display='none'
      document.getElementsByClassName('notifier')[0].style.display='flex'
      document.getElementsByClassName('notification')[0].textContent = result.value.retval
      let requestOptions = {
          method: 'POST',
          redirect: 'follow'
        };
        fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&code=back&state=press", requestOptions)
        .then(response => response.json())
        .then(result => {
          setTimeout(function(){
            fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&text=Chuyển liên ngân hàng", requestOptions)
            .then(response => response.text())
            .then(result => {
                setTimeout(function(){
                  document.getElementsByClassName('notify-send')[0].addEventListener('click',function(){
                        window.location.reload()
                    })
                },1000)
                console.log(result)
            }).catch(error => console.log('error', error));
          },1000)
          });
    }
  }).catch(error => console.log('error', error));
}

function ammountNMess(device,token,data,bank){
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Số tiền\",action:\"setText('"+data.ammount+"')\"}", requestOptions)
  .then(response => response.json())
  .then(result => {
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Nội dung%26%26OY:1\",action:\"setText('"+data.mess+"')\"}", requestOptions)
    .then(response => response.json())
    .then(result => {
      fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'T:Tiếp tục',action:\"click\"}", requestOptions)
      .then(response => response.json())
      .then(result =>{
        checkName(device,token,data,bank)
      }).catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
  })
  .catch(error => console.log('error', error));
}

function checkName(device,token,data,bank){
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'T:Đến tài khoản%7C%7COX:1',action:'getText'}", requestOptions)
  .then(response => response.json())
  .then(result =>{
      if(!result.value.retval){
        checkName(device,token,data,bank)
      }else{
        let value = result.value.retval.replace(/[0-9]/g, '').slice(1).replace(/\s/g, '').toLowerCase()
        let compareValue = data.bankaccountname.replace(/\s/g, '').toLowerCase()
        console.log(value)
        console.log(compareValue)
        console.log(value==compareValue)
        if(value==compareValue){
          fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Xác nhận %26 hoàn tất\",action:\"click\"}", requestOptions)
          .then(response => response.text())
          .then(result => {
            finalStep(device,token,data,bank)
          })
          .catch(error => console.log('error', error));
        }else{
          document.getElementsByClassName('otp-container')[0].style.display='none'
          document.getElementsByClassName('notifier')[0].style.display='flex'
          document.getElementsByClassName('notification')[0].textContent = "Sai Tên Người Thụ Hưởng"
          let requestOptions = {
              method: 'POST',
              redirect: 'follow'
            };
            fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&code=back&state=press", requestOptions)
            .then(response => response.text())
            .then(result => {
              setTimeout(function(){
                fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&code=back&state=press", requestOptions)
                .then(response => response.text())
                .then(result => {
                  setTimeout(function(){
                    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&code=back&state=press", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                      setTimeout(function(){
                        fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&text=Chuyển liên ngân hàng", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            setTimeout(function(){
                              document.getElementsByClassName('notify-send')[0].addEventListener('click',function(){
                                    window.location.reload()
                                })
                            },1000)
                            console.log(result)
                        }).catch(error => console.log('error', error));
                      },500)
                    }).catch(error => console.log('error', error));
                  },500)
                }).catch(error => console.log('error', error));
              },500)
            }).catch(error => {console.log('error', error)});
        }
      }
  }).catch(error => console.log(error));
}

function finalStep(device,token,data,bank){
  let raw = "";
  let requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
  };
  var state = []
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.tvNoteSuccess',action:'getText'}", requestOptions)
  .then(response => response.json())
  .then(result => {
      if(result.value.retval=="Quý khách đã giao dịch thành công!"){
          var transId = []
          let requestOptions = {
          method: 'POST',
          redirect: 'follow'
          };

          fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.tvTime',action:'getText'}", requestOptions)
          .then(response => response.json())
          .then(result => {
              transId[0] = result.value.retval
              let myHeaders = new Headers();
              myHeaders.append("authorization",  localStorage.getItem('token'));
              myHeaders.append("content-type", " application/json");
              myHeaders.append("origin", " https://bo.f8bet.cc");
              myHeaders.append("referer", " https://bo.f8bet.cc/");
              myHeaders.append("Cookie", "__cf_bm=Cu4TdVjVSkmbHJGf7dlHq3WHBQg0wNcR1598LaiC21s-1665641093-0-ATEZZM7xMWT7ryW5SaVSulX4nU+3OutIu3h/K3h5u1rK6V+KL97s09PaQcG817xl10gbSjyswBXQ0kMfFqlsx+E=");
              var transMess = transId[0].slice(transId[0].indexOf('\n')+2) 
              let raw = JSON.stringify(
                  {
                      "status": 8,
                      "thirdpartypaymentid": "",
                      "caccountid": "",
                      "approvereason": "VTN3 "+transMess,
                      "ecremarks": "",
                      "payoutwalletkey": null
                  }
              );

              let requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
              };
              fetch("https://boapi.f8bet.cc/f8bet-ims/api/v1/withdrawals/"+data.withdrawid+"/approve", requestOptions)
              .then(response => response.text())
              .then(result => {
                console.log(result)
                if(!result.includes('msg')){
                    console.log(result)
                    document.getElementsByClassName('otp-area')[0].style.top='0px'
                    document.getElementsByClassName('otp-area')[0].innerHTML='<img onclick="window.location.reload()" style="cursor:pointer;margin-left:-35%" src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif">'
                    // state[0]="true"
                    backToStart(device,token,data,bank,state[0])
                }else{
                    document.getElementsByClassName('otp-container')[0].style.display='none'
                    document.getElementsByClassName('notifier')[0].style.display='flex'
                    document.getElementsByClassName('notification')[0].textContent = 'Đơn Chưa Được Duyệt Thành Công. Vui Lòng Kiểm Tra Lại Số Dư Ngân Hàng Và Đường Truyền Mạng'
                    // state[0]="false"
                }
              }).catch(error => {
                  alert('Đơn Chưa Được Duyệt Thành Công. Vui Lòng Kiểm Tra Lại Số Dư Ngân Hàng Và Đường Truyền Mạng')
                  console.log('error', error)
              })    
          }).catch(error => console.log('error', error));
      }else{
        finalStep(device,token,data,bank)
      }
  })
  .catch(error => {
      finalStep(device,token,data,bank)
      console.log(error)
  });
}

function backToStart(device,token,data,bank,state){
  let Options = {
    method: 'POST',
    redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/inputs?token="+token+"&move=pagedown", Options)
  .then(response => response.text())
  .then(result => {
      setTimeout(function(){
        fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'T:Giao dịch tiếp',action:'click'}", Options)
        .then(response => response.json())
        .then(result => {
          if(!result.value.retval){
            backToStart(device,token,data,bank,state)
          }else{
              window.location.reload()
          }
        }).catch(error => console.log('error', error));
      },1500)
  }).catch(error => console.log('error', error));
}

export default page1

