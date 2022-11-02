import dateValue from '../constant/date'
const bankLogin = (user,password)=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", btoa(user+":"+password));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("http://localhost:8090/TotalControl/v2/login", requestOptions)
    .then(response => response.json())
    .then(result =>{
      if(result.status==true){
        console.log(result.value.token)
        localStorage.setItem('bankUser',user)
        localStorage.setItem('bankToken',result.value.token)
        fetch("http://localhost:8090/TotalControl/v2/devices?q=all&token="+result.value.token, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.ids)

          let loginContainer = document.getElementsByClassName('bankLogin')[0]
          document.getElementsByClassName('bankLoginForm')[0].style.display='none'

          result.ids.forEach((item)=>{
            let button = document.createElement('button')
            let device = document.createTextNode(item)
            button.appendChild(device)
            button.setAttribute('id',item)
            button.setAttribute('class','chooseDevices')
            loginContainer.appendChild(button)
            button.addEventListener('click',function(){
              localStorage.setItem('deviceName',button.getAttribute('id'))
              setTimeout(function(){
                window.location.reload()
              },500)
            })
          })
        })
        .catch(error => console.log('error', error));
        // window.location.reload()
      }else{
        localStorage.setItem('bankUser',"Vui Long Dang Nhap Lai")
        alert("Đăng Nhập Không Chính Xác")
        window.location.reload()
      }
    })
    .catch(error => console.log('error', error));
}

export default bankLogin