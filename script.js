 /* ===== music control ===== */
const bgm=document.getElementById('bgm');
const playBtn=document.getElementById('playBtn');
playBtn.addEventListener('click',()=>{
  bgm.volume=0.5;
  bgm.play().catch(()=>{});
  playBtn.textContent='🎶 Music Playing';
  playBtn.disabled=true;
});

/* ===== animated balloons + flowers ===== */
const canvas=document.getElementById('decor');
const ctx=canvas.getContext('2d');
let w,h,items=[];
function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;}
window.addEventListener('resize',resize);resize();

const colors=['#ff9ecb','#ffd8a8','#a8e6cf','#fff176','#d1c4e9'];
const shapes=['🎈','🌸','💐','💖','🌷','🎉'];

function spawn(){
  const shape=shapes[Math.floor(Math.random()*shapes.length)];
  const x=Math.random()*w;
  const size=30+Math.random()*25;
  const speed=0.3+Math.random()*0.7;
  const drift=(Math.random()-0.5)*0.3;
  const color=colors[Math.floor(Math.random()*colors.length)];
  items.push({x,y:h+size,shape,size,speed,drift,color,rot:Math.random()*360});
}

function draw(){
  ctx.clearRect(0,0,w,h);
  ctx.font='30px serif';
  items.forEach((it,i)=>{
    ctx.save();
    ctx.translate(it.x,it.y);
    ctx.rotate(it.rot*Math.PI/180);
    ctx.globalAlpha=0.8;
    ctx.fillText(it.shape,0,0);
    ctx.restore();
    it.y-=it.speed;
    it.x+=it.drift;
    it.rot+=0.3;
  });
  items=items.filter(it=>it.y>-50);
  if(Math.random()<0.05) spawn();
  requestAnimationFrame(draw);
}
draw();

/* ===== photo slideshow ===== */
const slides=document.querySelectorAll('.slide');
let current=0;
setInterval(()=>{
  slides[current].classList.remove('active');
  current=(current+1)%slides.length;
  slides[current].classList.add('active');
},3000); // change every 3 seconds
