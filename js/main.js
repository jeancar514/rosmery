// Curtain
const curtain = document.getElementById('curtain');
const enterBtn = document.getElementById('enterBtn');
function openCurtain(){
  curtain.classList.add('hidden');
  document.body.style.overflow = '';
}
enterBtn.addEventListener('click', openCurtain);
document.body.style.overflow = 'hidden';
setTimeout(()=>{ document.body.style.overflow = ''; }, 8000);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
revealEls.forEach(el=>io.observe(el));

// Sparkles
const sparkleLayer = document.getElementById('sparkles');
function spawnSpark(){
  const s = document.createElement('div');
  s.className = 'spark';
  s.style.left = Math.random()*100 + 'vw';
  s.style.top = 100 - Math.random()*10 + 'vh';
  const duration = 6 + Math.random()*6;
  s.style.animationDuration = duration + 's';
  sparkleLayer.appendChild(s);
  setTimeout(()=> s.remove(), duration*1000);
}
setInterval(spawnSpark, 900);
