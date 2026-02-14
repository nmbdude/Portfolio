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

// Lightweight lightbox helpers used across project pages
// Exposed globally so inline onclick handlers can call them
if (typeof window.openLightbox !== 'function') {
  (function() {
    function escHandler(e) {
      if (e.key === 'Escape') {
        window.closeLightbox();
      }
    }

    window.openLightbox = function(src) {
      var lightbox = document.getElementById('lightbox');
      var lightboxImg = document.getElementById('lightbox-img');
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src || lightboxImg.src;
      lightbox.style.display = 'flex';
      lightboxImg.style.transform = 'scale(1)'; // Reset zoom
      // Fade in
      requestAnimationFrame(function() {
        lightbox.style.opacity = '1';
      });
      document.addEventListener('keydown', escHandler);
      setupLightboxEventListeners();
    };

    window.closeLightbox = function() {
      var lightbox = document.getElementById('lightbox');
      var lightboxImg = document.getElementById('lightbox-img');
      if (!lightbox) return;
      lightbox.style.opacity = '0';
      setTimeout(function() {
        lightbox.style.display = 'none';
        if (lightboxImg) lightboxImg.src = '';
      }, 300);
      document.removeEventListener('keydown', escHandler);
    };

    function setupLightboxEventListeners() {
      var lightbox = document.getElementById('lightbox');
      var lightboxImg = document.getElementById('lightbox-img');
      if (!lightbox || !lightboxImg) return;

      // Remove existing listeners to avoid duplicates
      lightbox.removeEventListener('click', lightboxClickHandler);
      lightboxImg.removeEventListener('click', imageClickHandler);

      // Close on background click
      lightbox.addEventListener('click', lightboxClickHandler);

      // Toggle zoom on image click
      lightboxImg.addEventListener('click', imageClickHandler);
    }

    function lightboxClickHandler(e) {
      if (e.target.id === 'lightbox') {
        window.closeLightbox();
      }
    }

    function imageClickHandler(e) {
      e.stopPropagation();
      toggleImageZoom();
    }

    function toggleImageZoom() {
      var lightboxImg = document.getElementById('lightbox-img');
      if (!lightboxImg) return;
      if (lightboxImg.style.transform === 'scale(1.5)') {
        lightboxImg.style.transform = 'scale(1)';
      } else {
        lightboxImg.style.transform = 'scale(1.5)';
      }
    }
  })();
}
