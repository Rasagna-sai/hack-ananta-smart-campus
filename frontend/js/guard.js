// Professional Dashboard JavaScript with GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP animations
  gsap.registerPlugin();

  // Animate SOS button
  gsap.from('.sos-button', {
    duration: 1.5,
    scale: 0,
    opacity: 0,
    ease: 'back.out(1.7)',
    delay: 0.5
  });

  // Add continuous pulsing animation - start immediately and more prominent
  gsap.to('.sos-button', {
    duration: 1.5,
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
  });

  // Add continuous glow effect
  gsap.to('.sos-button', {
    duration: 2,
    boxShadow: '0 0 40px rgba(229, 115, 115, 0.8), 0 20px 60px rgba(229, 115, 115, 0.4)',
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    delay: 0.5
  });

  // Add subtle rotation to the SOS text
  gsap.to('.sos-icon', {
    duration: 3,
    rotation: 5,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    delay: 1
  });

  // Add loading animation for SOS button
  const sosButton = document.querySelector('.sos-button');

  if (sosButton) {
    sosButton.addEventListener('click', function(e) {
      const icon = this.querySelector('.sos-icon');

      if (icon) {
        // Add loading state
        gsap.to(icon, {
          duration: 0.3,
          rotation: 360,
          repeat: -1,
          ease: 'none'
        });

        // Remove loading after animation (in case user stays on page)
        setTimeout(() => {
          gsap.killTweensOf(icon);
          gsap.to(icon, {
            duration: 0.3,
            rotation: 0
          });
        }, 2000);
      }
    });
  }

  // Add ripple effect to SOS button
  if (sosButton) {
    sosButton.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  console.log('SOS Emergency Alert Button initialized with GSAP animations');
});