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

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function() {
  // Criar o observer para animações no scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Opcional: parar de observar após animar
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar os cards
  const cards = document.querySelectorAll('.expertise-card');
  cards.forEach((card, index) => {
    // Adicionar delay progressivo aos cards
    card.style.animationDelay = `${index * 0.4}s`;
    observer.observe(card);
  });

  // Observar o botão do GitHub
  const githubButton = document.querySelector('.github-button');
  if (githubButton) {
    observer.observe(githubButton);
  }

  // Observar as tags de tecnologias
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach(tag => {
    observer.observe(tag);
  });

  // Observar o título da seção de tecnologias
  const techSection = document.querySelector('.technologies-section');
  if (techSection) {
    techSection.style.opacity = '0';
    techSection.style.transform = 'translateY(30px)';
    techSection.style.transition = 'all 0.6s ease-out';
    
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    sectionObserver.observe(techSection);
  }
});