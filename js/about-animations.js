// About Page Animations - Image Gallery State Management
document.addEventListener('DOMContentLoaded', function() {
  const galleryImages = document.querySelectorAll('.gallery-img');
  const contentContainers = document.querySelectorAll('.content-container');
  
  // Estado atual
  let currentState = 'main';
  
  // Configurações de layout para cada estado
  const stateConfigs = {
    main: {
      mainPhoto: { width: '413px', height: '413px', left: '116px', top: '0', zIndex: 3, opacity: 1, transform: 'rotate(0deg) scale(1)' },
      graduation: { width: '244px', height: '327px', left: '346px', top: '-92px', zIndex: 2, opacity: 0.5, transform: 'rotate(0deg) scale(1)' },
      family: { width: '263px', height: '330px', left: '48px', top: '254px', zIndex: 1, opacity: 0.5, transform: 'rotate(0deg) scale(1)' }
    },
    graduation: {
      mainPhoto: { width: '318px', height: '318px', left: '174px', top: '29px', zIndex: 2, opacity: 0.8, transform: 'rotate(0deg) scale(1)' },
      graduation: { width: '308px', height: '412px', left: '332px', top: '-90px', zIndex: 3, opacity: 1, transform: 'rotate(0deg) scale(1)' },
      family: { width: '263px', height: '330px', left: '98px', top: '254px', zIndex: 1, opacity: 0.3, transform: 'rotate(0deg) scale(1)' }
    },
    family: {
      mainPhoto: { width: '318px', height: '318px', left: '174px', top: '29px', zIndex: 2, opacity: 0.8, transform: 'rotate(0deg) scale(1)' },
      graduation: { width: '244px', height: '327px', left: '332px', top: '-79px', zIndex: 1, opacity: 0.3, transform: 'rotate(0deg) scale(1)' },
      family: { width: '340px', height: '426px', left: '86px', top: '184px', zIndex: 3, opacity: 1, transform: 'rotate(0deg) scale(1)' }
    }
  };
  
  // Função para animar a transição entre estados
  function animateToState(newState) {
    if (newState === currentState) return;
    
    const config = stateConfigs[newState];
    
    // Animar imagens
    const mainPhoto = document.querySelector('.gallery-img.main-photo');
    const graduation = document.querySelector('.gallery-img.graduation');
    const family = document.querySelector('.gallery-img.family');
    
    // Aplicar transição suave
    [mainPhoto, graduation, family].forEach(img => {
      img.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Animar main photo
    Object.assign(mainPhoto.style, config.mainPhoto);
    
    // Animar graduation
    Object.assign(graduation.style, config.graduation);
    
    // Animar family
    Object.assign(family.style, config.family);
    
    // Fade out conteúdo atual
    const currentContent = document.querySelector(`.content-container[data-content="${currentState}"]`);
    const newContent = document.querySelector(`.content-container[data-content="${newState}"]`);
    
    if (currentContent) {
      currentContent.style.opacity = '0';
      currentContent.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        currentContent.classList.add('hidden');
      }, 300);
    }
    
    // Fade in novo conteúdo
    setTimeout(() => {
      if (newContent) {
        newContent.classList.remove('hidden');
        newContent.style.opacity = '0';
        newContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          newContent.style.transition = 'all 0.5s ease';
          newContent.style.opacity = '1';
          newContent.style.transform = 'translateY(0)';
        }, 50);
      }
    }, 300);
    
    // Atualizar classes active
    galleryImages.forEach(img => img.classList.remove('active'));
    const activeImg = document.querySelector(`.gallery-img[data-state="${newState}"]`);
    if (activeImg) activeImg.classList.add('active');
    
    currentState = newState;
  }
  
  // Adicionar event listeners para as imagens
  galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', function() {
      const state = this.dataset.state;
      animateToState(state);
    });
    
    // Efeito hover mais pronunciado na imagem ativa
    img.addEventListener('mouseenter', function() {
      if (this.classList.contains('active')) {
        this.style.transform = `${this.style.transform.includes('rotate') ? this.style.transform.split(' ')[0] : ''} scale(1.05)`.trim();
      }
    });
    
    img.addEventListener('mouseleave', function() {
      if (this.classList.contains('active')) {
        this.style.transform = `${this.style.transform.includes('rotate') ? this.style.transform.split(' ')[0] : ''} scale(1)`.trim();
      }
    });
  });
  
  // Inicializar estado inicial
  const initialContent = document.querySelector('.content-container[data-content="main"]');
  if (initialContent) {
    initialContent.style.opacity = '1';
    initialContent.style.transform = 'translateY(0)';
  }
});