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
});