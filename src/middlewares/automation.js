import waitForElm from "./waitForElm"

const auto = ()=>{
    var automate = document.getElementById('automate')
    if(!localStorage.getItem('state')){
        localStorage.setItem('state',"true")
      }
      if(localStorage.getItem('state')=="true"){
        autoBank()
        automate.textContent='Stop'
      }else{
        automate.textContent='Start'
        console.log('stop')
      }
      automate.addEventListener('click',function(){
        window.location.reload()
        if(localStorage.getItem('state')=="true"){
          automate.textContent='Stop'
          localStorage.setItem('state','false')
        }else{
          automate.textContent='Start'
          window.location.reload()
          localStorage.setItem('state','true')
        }
      })
}

function autoBank(){
  setTimeout(function(){
    if(!document.getElementsByClassName('data-row')[0]){
      if(document.getElementsByClassName('bankLoginForm')[0].style.display!='flex'){
        if(document.getElementsByClassName('formField')[0].style.display!='flex'){
          console.log('no transaction')
          window.location.reload()
        }
      }
    }else{
      if(localStorage.getItem('state')=="true"){
        document.getElementsByClassName('transferBtn')[0].click()
      }else{
          console.log('stop')
      }
    }
  },500)
}

export default auto