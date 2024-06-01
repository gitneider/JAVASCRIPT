// Slider de imágenes automático
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-slider img');
    let currentIndex = 0;
  
    setInterval(() => {
      // Ocultar la imagen actual
      images[currentIndex].classList.remove('active');
  
      // Incrementar el índice y volver al principio si se alcanza el final
      currentIndex = (currentIndex + 1) % images.length;
  
      // Mostrar la siguiente imagen
      images[currentIndex].classList.add('active');
    }, 3000);
  });