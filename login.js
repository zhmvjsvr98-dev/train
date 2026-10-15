document.addEventListener("DOMContentLoaded",()=>{

const form=document.getElementById("loginForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

localStorage.setItem(
"currentUser",
"運行管理者"
);

window.location.href=
"pages/dashboard.html";

});

});
