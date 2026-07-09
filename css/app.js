const typingText = document.getElementById("typingText");

const messages = [

"Generate profitable business ideas in seconds.",

"Create professional business plans instantly.",

"Discover untapped business opportunities.",

"Get AI-powered marketing strategies.",

"Turn your ideas into successful businesses."

];

let messageIndex = 0;
let charIndex = 0;

function typeWriter(){

    if(charIndex < messages[messageIndex].length){

        typingText.textContent += messages[messageIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeWriter,40);

    }

    else{

        setTimeout(eraseText,1800);

    }

}

function eraseText(){

    if(charIndex>0){

        typingText.textContent=messages[messageIndex].substring(0,charIndex-1);

        charIndex--;

        setTimeout(eraseText,20);

    }

    else{

        messageIndex++;

        if(messageIndex>=messages.length)

            messageIndex=0;

        setTimeout(typeWriter,300);

    }

}

typeWriter();
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