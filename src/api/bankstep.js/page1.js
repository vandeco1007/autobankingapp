const page1 = (data,bank)=>{
  if(!localStorage.getItem('bankcheck')){
    localStorage.setItem('bankcheck',"false")
  }
  localStorage.setItem('notification','watching...')
  let token = localStorage.getItem('bankToken')
  let device = localStorage.getItem('deviceName')
  //Set amount and message
  start(device,token,data,bank)
}

function start(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};

fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.tvExternalAccount\",action:\"click\"}", requestOptions)
.then(response => response.json())
.then(result => {
  if(!result.value.retval){
    start(device,token,data,bank)
  }else{
    chooseBank(device,token,data,bank)
  }
})
.catch(error => console.log('error', error));
}

function chooseBank(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};

fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.hint',action:\"click\"}", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(!result.value.retval){
      chooseBank(device,token,data,bank)
    }else{
      setBank(device,token,data,bank)
    }
  }).catch(error => console.log('error', error));
}

function setBank(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};
fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.search\",action:\"setText('"+bank+"')\"}", requestOptions)
.then(response => response.json())
.then(result => {
  console.log(result)
  if(!result.value.retval){
    setBank(device,token,data,bank)
  }else{
    setTimeout(function(){
      clickBank(device,token,data,bank)
    },500)
  }
}).catch(error => console.log('error', error));
}

function clickBank(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};

fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.icon',action:\"click\"}", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(!result.value.retval){
      clickBank(device,token,data,bank)
    }else{
      setAcc(device,token,data,bank)
    }
  }).catch(error => console.log('error', error));
}

function setAcc(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};

fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/texts?token="+token+"&text="+data.bankAcc+"&position=0", requestOptions)
.then(response => response.json())
.then(result => {
  if(result.status!=true){
    setAcc(device,token,data,bank)
  }else{
    setTimeout(function(){
      next(device,token,data,bank)
    },500)
  }
}).catch(error => console.log('error', error));
}

function next(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};
fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Tiếp tục\",action:\"click\"}", requestOptions)
.then(response => response.json())
.then(result => {
  if(!result.value.retval){
    next(device,token,data,bank)
  }else{
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Đóng\",action:\"getText\"}", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(!result.value.retval)
      if(!result.value.retval){
        ammountNMess(device,token,data,bank)
      }else{
        document.getElementsByClassName('otp-container')[0].style.display='none'
        document.getElementsByClassName('notifier')[0].style.display='flex'
        document.getElementsByClassName('notification')[0].textContent = "Sai số thẻ hoặc ngân hàng thụ hưởng"
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Đóng\",action:\"click\"}", requestOptions)
          .then(response => response.json())
          .then(result => {
            setTimeout(function(){
              fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.tvInternal\",action:\"click\"}", requestOptions)
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
            });
      }
    }).catch(error => console.log('error', error));
  }
}).catch(error => console.log('error', error));
}

function ammountNMess(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};
fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.payeeName\",action:\"getText\"}", requestOptions)
.then(response => response.json())
.then(result => {
  if(!result.value.retval){
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Thông tin giao dịch\",action:\"getText\"}", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(!result.value.retval){
        ammountNMess(device,token,data,bank)
      }else{
        fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.counter_content%26%26OY:1\",action:\"setText('"+data.mess+"')\"}", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('sussess')
        }).catch(error => console.log('error', error));
        fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.amount_translate%26%26OY:-1\",action:\"click\"}", requestOptions)
        .then(response => response.json())
        .then(result => {
          fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/texts?text="+data.ammount+"&token="+token, requestOptions)
          .then(response => response.json())
          .then(result => {
            fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Tiếp tục\",action:\"click\"}", requestOptions)
            .then(response => response.text())
            .then(result => {
              checkName(device,token,data,bank)
            }).catch(error => console.log('error', error));
          }).catch(error => console.log('error', error));
        }).catch(error => console.log('error', error))
      }
    }).catch(error => console.log('error', error));
  }else{
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Tiếp tục\",action:\"click\"}", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(!result.value.retval){
        next(device,token,data,bank)
      }else{
        fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Đóng\",action:\"getText\"}", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(!result.value.retval)
          ammountNMess(device,token,data,bank)
        }).catch(error => console.log('error', error));
      }
    }).catch(error => console.log('error', error));
  }
}).catch(error => console.log('error', error));
}

function checkName(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};
fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Nhập mã PIN Smart OTP\",action:\"getText\"}", requestOptions)
.then(response => response.json())
.then(result => {
  if(!result.value.retval){
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Tên người thụ hưởng%26%26OX:1\",action:\"getText\"}", requestOptions)
    .then(response => response.json())
    .then(result =>{
        if(!result.value.retval){
          checkName(device,token,data,bank)
        }else{
          let value = result.value.retval.replace(/[0-9]/g, '').replace(/\s/g, '').toLowerCase()
          let compareValue = data.bankaccountname.replace(/\s/g, '').toLowerCase()
          console.log(value)
          console.log(compareValue)
          console.log(value==compareValue)
          if(value==compareValue){
            fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.submit\",action:\"click\"}", requestOptions)
            .then(response => response.json())
            .then(result => {
              if(!result.value.retval){
                checkName(device,token,data,bank)
              }else{
                console.log('success')
                finalStep(device,token,data,bank)
              }
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
                  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.tvInternal\",action:\"click\"}", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                    setTimeout(function(){
                      document.getElementsByClassName('notify-send')[0].addEventListener('click',function(){
                        window.location.reload()
                      })
                    },1000)
                  }).catch(error => console.log('error', error));
                },500)
              }).catch(error => {console.log('error', error)});
          }
        }
    }).catch(error => console.log(error));
  }else{
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/screen/texts?token="+token+"&text=258000", requestOptions)
    .then(response => response.text())
    .then(result => {
      checkName(device,token,data,bank)
    })
    .catch(error => console.log('error', error));
  }
}).catch(error => console.log('error', error));
}

function finalStep(device,token,data,bank){
  let raw = "";
  let requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
  };
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:'R:.success_title',action:'getText'}", requestOptions)
  .then(response => response.json())
  .then(result => {
      if(!result.value.retval){
        finalStep(device,token,data,bank)
      }else{
      let myHeaders = new Headers();
      myHeaders.append("authorization",  localStorage.getItem('token'));
      myHeaders.append("content-type", " application/json");
      myHeaders.append("origin", " https://bo.f8bet.cc");
      myHeaders.append("referer", " https://bo.f8bet.cc/");
      myHeaders.append("Cookie", "__cf_bm=Cu4TdVjVSkmbHJGf7dlHq3WHBQg0wNcR1598LaiC21s-1665641093-0-ATEZZM7xMWT7ryW5SaVSulX4nU+3OutIu3h/K3h5u1rK6V+KL97s09PaQcG817xl10gbSjyswBXQ0kMfFqlsx+E=");
      let raw = JSON.stringify(
          {
              "status": 8,
              "thirdpartypaymentid": "",
              "caccountid": "",
              "approvereason": "BIDV ",
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
      fetch("https://boapi.moto88.org/moto88-ims/api/v1/withdrawals/"+data.withdrawid+"/approve", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(!result.includes('msg'))
        if(!result.includes('msg')){
            console.log(result)
            document.getElementsByClassName('otp-area')[0].style.top='0px'
            document.getElementsByClassName('otp-area')[0].innerHTML='<img style="cursor:pointer;margin-left:-35%" src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif">'
            backToStart(device,token,data,bank)
          }else{
            document.getElementsByClassName('otp-container')[0].style.display='none'
            document.getElementsByClassName('notifier')[0].style.display='flex'
            document.getElementsByClassName('notification')[0].textContent = 'Đơn Chưa Được Duyệt Thành Công. Vui Lòng Kiểm Tra Lại Số Dư Ngân Hàng Và Đường Truyền Mạng'
        }
      }).catch(error => {
          alert('Đơn Chưa Được Duyệt Thành Công. Vui Lòng Kiểm Tra Lại Số Dư Ngân Hàng Và Đường Truyền Mạng')
          console.log('error', error)
      })  
    }
  }).catch(error => {
      finalStep(device,token,data,bank)
      console.log(error)
});

function backToStart(device,token,data,bank){
  let Options = {
    method: 'POST',
    redirect: 'follow'
    };          
  fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"T:Tạo giao dịch mới\",action:\"click\"}", Options)      
    .then(response => response.json())
    .then(result => {
      if(!result.value.retval){
        backToStart(device,token,data,bank)
      }
      setTimeout(function(){
        setUpNew(device,token,data,bank)
      },1000)
    }).catch(error => console.log('error', error));
  }
}

function setUpNew(device,token,data,bank){
let requestOptions = {
  method: 'POST',
  redirect: 'follow'
};
fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.tvInternal\",action:\"click\"}", requestOptions)
.then(response => response.json())
.then(result => {
  if(!result.value.retval){
    setUpNew(device,token,data,bank)
  }else{
    fetch("http://localhost:8090/TotalControl/v2/devices/"+device+"/sendAai?token="+token+"&params={query:\"R:.ivContact\",action:\"getText\"}", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.value.retval==null)
      if(!result.value.retval==null){
        setUpNew(device,token,data,bank)
      }else{
        setTimeout(function(){
          window.location.reload()
        },500)
        console.log(result)
      }
    }).catch(error => console.log('error', error));
  }
}).catch(error => console.log('error', error));
}

export default page1



