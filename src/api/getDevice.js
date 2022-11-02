const getDevice = ()=>{
    var token = localStorage.getItem('bankToken')
    var device = localStorage.getItem('deviceName')
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:8090/TotalControl/v2/devices?q=all&token="+token, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.ids)
            if(result.status==false){
                document.getElementsByClassName('bankLoginForm')[0].style.display="flex"
                document.getElementsByClassName('bankAccount')[0].style.display='none'
                console.log('Vui lòng đăng nhập')
                localStorage.setItem('bankToken','new session')
                localStorage.setItem('deviceName','new session')
            }else{
                console.log('ok')
            }
        }).catch(error => {
            document.getElementsByClassName('bankLoginForm')[0].style.display="flex"
            document.getElementsByClassName('bankAccount')[0].style.display='none'
            // alert('Vui lòng kết nối Total')
        });
}

export default getDevice