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

  // Scroll Animation Observer
  setupScrollAnimations();
});

// Scroll Animation Observer
function setupScrollAnimations() {
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

  // Observar os cards do grid (quando não está em carousel)
  const cards = document.querySelectorAll('.projects-grid .project-card');
  cards.forEach((card, index) => {
    // Adicionar delay progressivo mais lento aos cards
    card.style.animationDelay = `${index * 0.25}s`;
    observer.observe(card);
  });
}

// Carousel Functionality
  const carousel = document.querySelector('.projects-carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    // Animar os cards dentro do slide ativo
  const activeCards = slides[index].querySelectorAll('.project-card');
  activeCards.forEach((card, cardIndex) => {
    // Reset animation
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = null;
    card.style.animationDelay = `${cardIndex * 0.25}s`;
  });
    
    currentSlide = index;
  }

  // Function to go to next slide
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }

  // Function to go to previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }

  // Event listeners for arrows
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        nextSlide();
      } else {
        // Swiped right - go to previous slide
        prevSlide();
      }
    }
  }

  // Initialize: show first slide
  if (slides.length > 0) {
    showSlide(0);
  }

// Add smooth scroll behavior
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