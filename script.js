// Year Footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Animation
window.addEventListener('load', () => {
  document.querySelectorAll('.bar > span').forEach(el => {
    const target = el.style.width || '0%';
    el.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transition = 'width 900ms ease';
        el.style.width = target;
      }, 80);
    });
  });
});

// Lightbox + Reveal + Ripple
(function(){
  const ready = (fn)=>{
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };
  ready(function(){
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    if(box && img && closeBtn){
      function openLightbox(src){
        img.src = src;
        box.classList.add('open');
        box.setAttribute('aria-hidden','false');
        document.body.style.overflow='hidden';
      }
      function closeLightbox(){
        box.classList.remove('open');
        box.setAttribute('aria-hidden','true');
        img.removeAttribute('src');
        document.body.style.overflow='';
      }
      document.addEventListener('click', function(e){
  const media = e.target.closest && e.target.closest('.project .thumb');
  if(media){
    const imgEl = media.querySelector('img');
    if(!imgEl) return;
    const full = imgEl.getAttribute('data-full') || imgEl.src;
    openLightbox(full);
  }else if(e.target === box || e.target === closeBtn){
    closeLightbox();
  }

    // Defensive: attach direct listeners on each .thumb as well
    document.querySelectorAll('.project .thumb').forEach(function(th){
      th.addEventListener('click', function(e){
        const imgEl = th.querySelector('img');
        if(!imgEl) return;
        const full = imgEl.getAttribute('data-full') || imgEl.src;
        openLightbox(full);
      });
    });

});
document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && box.classList.contains('open')) closeLightbox();
      });
    }

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal on scroll
    const cards = Array.from(document.querySelectorAll('.project'));
    cards.forEach(c => c.classList.add('reveal'));
    if (!reduceMotion && 'IntersectionObserver' in window){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
      },{ threshold: .15 });
      cards.forEach(c=> io.observe(c));
    } else {
      cards.forEach(c=> c.classList.add('in'));
    }

    // Ripple on click within .thumb
    document.addEventListener('click', function(ev){
      const imgEl = ev.target.closest && ev.target.closest('.project .thumb img');
      if(!imgEl) return;
      const wrap = imgEl.parentElement;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = wrap.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      const x = ev.clientX - rect.left - size/2;
      const y = ev.clientY - rect.top - size/2;
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      wrap.appendChild(ripple);
      setTimeout(()=> ripple.remove(), 650);
    }, true);
  });
})();



// Ensure a stable hover target by animating an inner wrapper instead of the card itself
(function(){
  const ready = (fn)=>{
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };
  ready(function(){
    document.querySelectorAll('.project').forEach(card=>{
      if(!card.querySelector(':scope > .project-inner')){
        const inner = document.createElement('div');
        inner.className = 'project-inner';
        while(card.firstChild){
          inner.appendChild(card.firstChild);
        }
        card.appendChild(inner);
      }
    });
  });
})();
