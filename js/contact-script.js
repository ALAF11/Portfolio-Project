// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {

  // Adicionar efeito de cursor suave
  const cursorLight = document.querySelector('.cursor-light');
  
  if (cursorLight) {
    document.addEventListener('mousemove', (e) => {
      cursorLight.style.left = e.clientX + 'px';
      cursorLight.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
      cursorLight.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorLight.style.opacity = '1';
    });
  }
    
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1565030625604538538/nzHh6-jC68ZDAhI9lue5Tgo3cTb9y0TinaZTcL7B0QV_mS4y4xUvP8v9xLvC1joYAs-C';

  // Form validation and submission
  window.handleSubmit = async function() {
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

    // Desabilitar botão enquanto envia
    const sendButton = document.querySelector('.send-button');
    const originalButtonContent = sendButton.innerHTML;
    sendButton.disabled = true;
    sendButton.innerHTML = '<span>Sending...</span>';
    sendButton.style.opacity = '0.6';
    sendButton.style.cursor = 'not-allowed';
    
    try {
      // Criar embed para Discord
      const embed = {
        title: "📧 New Contact Form Submission",
        color: 0x51A2FF,
        fields: [
          {
            name: "👤 Name",
            value: `${firstName} ${lastName}`,
            inline: true
          },
          {
            name: "📧 Email",
            value: email,
            inline: true
          },
          {
            name: "📝 Subject",
            value: subject,
            inline: false
          },
          {
            name: "💬 Message",
            value: message.length > 1024 ? message.substring(0, 1021) + "..." : message,
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Portfolio Contact Form"
        }
      };
      
      // Enviar para Discord
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'CaptainHook',
          avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
          embeds: [embed]
        })
      });
      
      if (response.ok || response.status === 204) {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Limpar formulário após sucesso
        setTimeout(() => {
          document.getElementById('firstName').value = '';
          document.getElementById('lastName').value = '';
          document.getElementById('email').value = '';
          document.getElementById('subject').value = '';
          document.getElementById('message').value = '';
        }, 1000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('Failed to send message. Please try again or contact me directly via email.', 'error');
    } finally {
      // Reabilitar botão
      sendButton.disabled = false;
      sendButton.innerHTML = originalButtonContent;
      sendButton.style.opacity = '1';
      sendButton.style.cursor = 'pointer';
    }
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
      fontFamily: 'Poppins, sans-serif',
      maxWidth: '500px',
      textAlign: 'center'
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
    
    // Remover notificação após 4 segundos
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
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