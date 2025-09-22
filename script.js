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
