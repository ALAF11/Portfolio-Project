// Criar elemento de luz que segue o cursor
document.addEventListener('DOMContentLoaded', function() {
  // Criar o elemento de luz
  const cursorLight = document.createElement('div');
  cursorLight.className = 'cursor-light';
  document.body.appendChild(cursorLight);

  // Atualizar posição da luz ao mover o mouse
  document.addEventListener('mousemove', function(e) {
    cursorLight.style.left = e.clientX + 'px';
    cursorLight.style.top = e.clientY + 'px';
  });

  // Esconder luz quando o cursor sai da janela
  document.addEventListener('mouseleave', function() {
    cursorLight.style.opacity = '0';
  });

  // Mostrar luz quando o cursor entra na janela
  document.addEventListener('mouseenter', function() {
    cursorLight.style.opacity = '1';
  });

  // Adiciona efeito de parallax suave ao logo
  const heroSection = document.querySelector('.Herosection');
  if (heroSection) {
    document.addEventListener('mousemove', function(e) {
      const x = (window.innerWidth - e.clientX) / 50;
      const y = (window.innerHeight - e.clientY) / 50;
      
      heroSection.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Adicionar efeito de hover nos cards com transformação 3D
  const cards = document.querySelectorAll('.Card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.style.transform = `translateY(-2px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Adicionar partículas de fundo
  createStarField();
});

// Função para criar campo de estrelas de fundo
function createStarField() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  const starCount = 100;

  // Criar estrelas
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.05 + 0.01
    });
  }

  // Animar estrelas
  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      // Efeito de piscamento
      star.opacity += star.speed;
      if (star.opacity >= 0.7 || star.opacity <= 0.2) {
        star.speed = -star.speed;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150, 180, 220, ${star.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animateStars);
  }

  animateStars();

  // Redimensionar canvas quando a janela muda de tamanho
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Adicionar scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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