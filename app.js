function logout(){

localStorage.removeItem("currentUser");

window.location.href="../index.html";

}

function updateClock(){

const target=
document.getElementById("currentDateTime");

if(!target) return;

const now=new Date();

target.textContent=
now.toLocaleString("ja-JP");

}

setInterval(updateClock,1000);

document.addEventListener(
"DOMContentLoaded",
updateClock
);
