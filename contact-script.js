// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Form validation and submission
  window.handleSubmit = function() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validação básica
    if (!firstName || !lastName || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Simular envio (você pode adicionar integração real aqui)
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Limpar formulário
    setTimeout(() => {
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
    }, 1500);
  };
  
  // Função para mostrar notificações
  function showNotification(message, type) {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Adicionar estilos
    Object.assign(notification.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '24px 40px',
      borderRadius: '16px',
      fontSize: '18px',
      fontWeight: '500',
      zIndex: '1000',
      opacity: '0',
      transition: 'opacity 0.3s ease',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      color: '#FFFFFF',
      fontFamily: 'Poppins, sans-serif'
    });
    
    if (type === 'success') {
      notification.style.background = 'linear-gradient(135deg, #00d492 0%, #00a876 100%)';
    } else {
      notification.style.background = 'linear-gradient(135deg, #FF4757 0%, #D13847 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Adicionar efeito de foco nos inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // Permitir submissão com Enter (exceto no textarea)
  const formInputs = document.querySelectorAll('input');
  formInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    });
  });
});