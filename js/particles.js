const canvas = document.createElement("canvas");

document.body.appendChild(canvas);

canvas.style.position="fixed";
canvas.style.top="0";
canvas.style.left="0";
canvas.style.width="100%";
canvas.style.height="100%";
canvas.style.zIndex="-2";
canvas.style.pointerEvents="none";

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles=[];

const TOTAL=80;

for(let i=0;i<TOTAL;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

vx:(Math.random()-.5)*0.4,

vy:(Math.random()-.5)*0.4,

r:Math.random()*2+1

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach((p,i)=>{

p.x+=p.vx;

p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;

if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle="rgba(229,57,53,.8)";

ctx.fill();

for(let j=i+1;j<particles.length;j++){

const q=particles[j];

const dx=p.x-q.x;

const dy=p.y-q.y;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<130){

ctx.beginPath();

ctx.moveTo(p.x,p.y);

ctx.lineTo(q.x,q.y);

ctx.strokeStyle=`rgba(255,255,255,${1-dist/130})`;

ctx.lineWidth=.4;

ctx.stroke();

}

}

});

requestAnimationFrame(animate);

}

animate();