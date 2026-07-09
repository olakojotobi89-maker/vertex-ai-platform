const menuBtn=document.getElementById("menuBtn");

const sidebar=document.getElementById("sidebar");

const overlay=document.getElementById("overlay");

menuBtn.onclick=()=>{

sidebar.classList.add("active");

overlay.classList.add("active");

};

overlay.onclick=()=>{

sidebar.classList.remove("active");

overlay.classList.remove("active");

};

const greeting=document.getElementById("greeting");

const hour=new Date().getHours();

if(hour<12){

greeting.innerHTML="Good Morning ☀️";

}

else if(hour<17){

greeting.innerHTML="Good Afternoon 🌤️";

}

else{

greeting.innerHTML="Good Evening 🌙";

}

const newChat=document.querySelector(".new-chat");

const modal=document.getElementById("newChatModal");

const closeModal=document.getElementById("closeModal");

newChat.onclick=()=>{

modal.classList.add("active");

}

closeModal.onclick=()=>{

modal.classList.remove("active");

}

modal.onclick=(e)=>{

if(e.target===modal){

modal.classList.remove("active");

}

}