const authorize = (result)=>{
    if(!result.msg){
        console.log(result)
        document.getElementsByClassName('user-info')[0].style.display='flex'
    }else{
        alert(result.msg)
        document.getElementsByClassName('user-info')[0].style.display='none'
        document.getElementsByClassName('formField')[0].style.display='flex'
    }
}

export default authorize

//eyJhbGciOiJIUzI1NiJ9.ewogICJpYXQiIDogMTY2NTgxOTIzMiwKICAiZXhwIiA6IDE2NjU4MzAwMzIsCiAgInVzZXJuYW1lIiA6ICJqdW44ODk5NiIsCiAgImVtYWlsIiA6IG51bGwsCiAgInJvbGUiIDogIiIsCiAgImV4dHJhIiA6ICJ7fSIsCiAgImlzb3AiIDogdHJ1ZQp9.dZ6VXgou2rtShYQpmL8fn5xhOW8q0ZI5qhVK3zQp7jI