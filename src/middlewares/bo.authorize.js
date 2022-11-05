const authorize = (result)=>{
    if(!result.msg){
        console.log(result)
        document.getElementsByClassName('user-info')[0].style.display='flex'
    }else{
        if(window.location.href.split('/')[3]!='login'){
            window.location.href='/login'
        }
    }
}

export default authorize
