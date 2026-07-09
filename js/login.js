document.getElementById("loginForm").addEventListener("submit",(e)=>{

e.preventDefault();

localStorage.setItem("loggedIn","true");

window.location.href="dashboard.html";

});