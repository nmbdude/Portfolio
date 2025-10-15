// Swiper initialization for Amiibo Center gallery
// Assumes Swiper CSS/JS is loaded in the page

document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.swiper');
  if (!container) return;
  var prevEl = container.querySelector('.carousel-arrow.left');
  var nextEl = container.querySelector('.carousel-arrow.right');
  var dotsEl = container.querySelector('.carousel-dots');

  if(!prevEl || !nextEl){
    console.warn('Swiper nav elements missing', {prevEl, nextEl});
  }
  var swiper = new Swiper(container, {
    slidesPerView: 1,
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        origin: "left center",
        translate: ["-5%", 0, -200],
        rotate: [0, 100, 0],
      },
      next: {
        shadow: true,
        origin: "right center",
        translate: ["5%", 0, -200],
        rotate: [0, -100, 0],
      },
    },
    navigation: {
    nextEl: nextEl || '.swiper-button-next',
    prevEl: prevEl || '.swiper-button-prev',
    },
    pagination: {
      el: dotsEl,
      clickable: true,
      bulletClass: 'dot',
      bulletActiveClass: 'active',
      renderBullet: function (index, className) {
        // Only render bullets for first 3 slides (hide the dummy 4th slide bullet)
        if (index < 3) {
          return '<button type="button" class="' + className + '" aria-label="Go to slide ' + (index + 1) + '"></button>';
        }
        return '';
      }
    },
    on: {
      slideChange: function() {
        // Center/side scaling
        document.querySelectorAll('.swiper-slide').forEach((s, i) => {
          s.classList.toggle('is-center', i === swiper.activeIndex);
        });
      }
    }
    
  });
  // Lightbox open on image click
  document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.addEventListener('click', function() {
      if (window.openLightbox) window.openLightbox(img.src);
    });
  });
});
