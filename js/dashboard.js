const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

if(hour < 12){

greeting.innerHTML = "Good Morning ☀️";

}

else if(hour < 17){

greeting.innerHTML = "Good Afternoon 🌤️";

}

else{

greeting.innerHTML = "Good Evening 🌙";

}

// =============================
// Vertex AI Workspace Storage
// =============================

let workspaces = [];

const modal = document.getElementById("workspaceModal");

const newWorkspace = document.getElementById("newWorkspace");

const closeModal = document.getElementById("closeModal");

newWorkspace.addEventListener("click", () => {

    modal.style.display = "flex";

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});