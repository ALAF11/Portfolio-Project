// Cursor Light Effect
document.addEventListener('DOMContentLoaded', function() {
  const cursorLight = document.querySelector('.cursor-light');
  
  if (cursorLight) {
    document.addEventListener('mousemove', (e) => {
      cursorLight.style.left = e.clientX + 'px';
      cursorLight.style.top = e.clientY + 'px';
    });

    // Hide cursor light when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursorLight.style.opacity = '0';
    });

    // Show cursor light when mouse enters the window
    document.addEventListener('mouseenter', () => {
      cursorLight.style.opacity = '1';
    });
  }
});

// Optional: Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});