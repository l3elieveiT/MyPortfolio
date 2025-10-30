// Year Footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// NAV ACTIVE
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav(hash) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === hash) link.classList.add('active');
  });
}

// Skill Bars
function animateSkillBars() {
  document.querySelectorAll('.swiper-slide-active .bar span').forEach(el => {
    const target = el.dataset.width || '0%';
    el.style.transition = 'none';
    el.style.width = '0%';
    void el.offsetWidth; // reflow
    el.style.transition = 'width 1000ms steps(12, end) 150ms';
    el.style.width = target;
  });
}
function resetSkillBars() {
  document.querySelectorAll('.bar span').forEach(el => {
    el.style.transition = 'none';
    el.style.width = '0%';
  });
}

// Swiper init
const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: false,
  speed: 800,
  pagination: { el: '.swiper-pagination', clickable: true },
  mousewheel: true,
  keyboard: { enabled: true },
  hashNavigation: { watchState: true, replaceState: true },
  on: {
    init(swiper){
      updateActiveNav(window.location.hash || '#home');
      if (swiper.realIndex === 3) setTimeout(animateSkillBars, 400);
    },
    slideChange(swiper){
      const currentSlide = swiper.slides[swiper.realIndex];
      const hash = '#' + currentSlide.getAttribute('data-hash');
      updateActiveNav(hash);
      resetSkillBars();
    },
    slideChangeTransitionEnd(swiper){
      if (swiper.realIndex === 3) setTimeout(animateSkillBars, 150);
    }
  }
});

window.addEventListener('hashchange', () => {
  if (location.hash === '#skills') setTimeout(animateSkillBars, 300);
  else resetSkillBars();
});
if (location.hash === '#skills') setTimeout(animateSkillBars, 400);

// Lightbox
(function(){
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if(!box || !img || !closeBtn) return;

  function openLightbox(src){
    img.src = src;
    box.classList.add('open');
    box.setAttribute('aria-hidden','false');
    swiper.mousewheel.disable(); swiper.keyboard.disable();
  }
  function closeLightbox(){
    box.classList.remove('open');
    box.setAttribute('aria-hidden','true');
    img.removeAttribute('src');
    swiper.mousewheel.enable(); swiper.keyboard.enable();
  }
  document.addEventListener('click', (e)=>{
    const media = e.target.closest && e.target.closest('.project .thumb');
    if(media){
      const imgEl = media.querySelector('img');
      if(!imgEl) return;
      const full = imgEl.getAttribute('data-full') || imgEl.src;
      openLightbox(full);
    } else if(e.target === box || e.target === closeBtn){
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && box.classList.contains('open')) closeLightbox();
  });
})();

// ===== 8-BIT NEON ANIMATION PACK (inline) =====
(function(){
  // Mark all cards as reveal targets
  document.querySelectorAll('.card, .project, .about-card-like, .work-card').forEach(el=>{
    if(!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  // IntersectionObserver for reveal
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('is-visible'));
  }

  // Pixel particles in background (once)
  if(!document.querySelector('.pixels-layer')){
    const layer = document.createElement('div');
    layer.className = 'pixels-layer';
    document.body.appendChild(layer);
    const count = Math.min(80, Math.floor(window.innerWidth / 20));
    for(let i=0;i<count;i++){
      const d = document.createElement('div');
      d.className = 'pixel-dot';
      const left = Math.random()*100;
      const top = 100 + Math.random()*60;
      const dur = 8 + Math.random()*12;
      const delay = Math.random()*-dur;
      d.style.left = left+'vw';
      d.style.top = top+'vh';
      d.style.animationDuration = dur+'s';
      d.style.animationDelay = delay+'s';
      layer.appendChild(d);
    }
  }
})();


// Mobile nav toggle
(function(){
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.nav-toggle');
  if(nav && btn){
    btn.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
