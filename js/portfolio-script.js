// Cursor Light Effect
const cursorLight = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e) => {
  cursorLight.style.left = e.clientX + 'px';
  cursorLight.style.top = e.clientY + 'px';
  cursorLight.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursorLight.style.opacity = '0';
});