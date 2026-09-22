// Curtain
const curtain = document.getElementById('curtain');
const enterBtn = document.getElementById('enterBtn');
function openCurtain(){
  curtain.classList.add('hidden');
  startStories();
}
enterBtn.addEventListener('click', openCurtain);

// Sparkles
const sparkleLayer = document.getElementById('sparkles');
const sparkColors = ['c-gold','c-emerald','c-wine','c-copper','c-sapphire','c-plum'];
function spawnSpark(){
  const s = document.createElement('div');
  const color = sparkColors[Math.floor(Math.random()*sparkColors.length)];
  s.className = 'spark ' + color;
  s.style.left = Math.random()*100 + 'vw';
  s.style.top = 100 - Math.random()*10 + 'vh';
  const duration = 6 + Math.random()*6;
  s.style.animationDuration = duration + 's';
  sparkleLayer.appendChild(s);
  setTimeout(()=> s.remove(), duration*1000);
}
setInterval(spawnSpark, 900);

// ---------- STORIES ----------
const slides = Array.from(document.querySelectorAll('.slide'));
const progressBar = document.getElementById('progressBar');
const tapPrev = document.getElementById('tapPrev');
const tapNext = document.getElementById('tapNext');

slides.forEach(()=>{
  const seg = document.createElement('div');
  seg.className = 'seg';
  const fill = document.createElement('div');
  fill.className = 'fill';
  seg.appendChild(fill);
  progressBar.appendChild(seg);
});
const segs = Array.from(progressBar.querySelectorAll('.seg'));

let current = -1;
let advanceTimer = null;
let started = false;

function clearVideos(){
  slides.forEach(sl=>{
    const v = sl.querySelector('video');
    if(v){ v.pause(); }
  });
}

function playVideoIn(slide){
  const v = slide.querySelector('video');
  if(v){
    v.currentTime = 0;
    v.play().catch(()=>{});
  }
}

function revealContents(slide){
  const items = Array.from(slide.querySelectorAll('.fx'));
  items.forEach((el,i)=>{
    el.classList.remove('in');
    el.style.transitionDelay = (i * 110) + 'ms';
  });
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      items.forEach(el=> el.classList.add('in'));
    });
  });
}

function goTo(index){
  if(index < 0) index = 0;
  if(index >= slides.length) index = slides.length - 1;
  if(index === current) return;

  if(advanceTimer){ clearTimeout(advanceTimer); advanceTimer = null; }
  clearVideos();

  slides.forEach(sl=> sl.classList.remove('active'));
  segs.forEach((seg,i)=>{
    seg.classList.remove('active');
    const fill = seg.querySelector('.fill');
    fill.style.animation = 'none';
    if(i < index){ seg.classList.add('done'); }
    else { seg.classList.remove('done'); }
  });

  current = index;
  const slide = slides[current];
  slide.classList.add('active');
  revealContents(slide);
  playVideoIn(slide);

  const duration = parseInt(slide.dataset.duration, 10) || 6000;
  const seg = segs[current];
  seg.classList.add('active');
  const fill = seg.querySelector('.fill');
  requestAnimationFrame(()=>{
    fill.style.animationDuration = duration + 'ms';
    fill.style.animation = `seg-fill ${duration}ms linear forwards`;
  });

  if(current < slides.length - 1 && duration < 90000){
    advanceTimer = setTimeout(()=> goTo(current + 1), duration);
  }
}

function next(){
  if(current >= slides.length - 1){
    goTo(0);
  } else {
    goTo(current + 1);
  }
}
function prev(){ goTo(current - 1); }

tapNext.addEventListener('click', next);
tapPrev.addEventListener('click', prev);

// swipe support
let touchStartX = null;
document.getElementById('stories').addEventListener('touchstart', (e)=>{
  touchStartX = e.changedTouches[0].clientX;
},{passive:true});
document.getElementById('stories').addEventListener('touchend', (e)=>{
  if(touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if(Math.abs(dx) > 50){
    if(dx < 0) next(); else prev();
  }
  touchStartX = null;
},{passive:true});

function startStories(){
  if(started) return;
  started = true;
  goTo(0);
}
