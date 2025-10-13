// Swiper initialization for Amiibo Center gallery
// Assumes Swiper CSS/JS is loaded in the page

document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.swiper');
  if (!container) return;
  var prevEl = container.querySelector('.carousel-arrow.left');
  var nextEl = container.querySelector('.carousel-arrow.right');
  var dotsEl = container.querySelector('.carousel-dots');

  var swiper = new Swiper(container, {
    slidesPerView: 1,
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
          shadow: true,
          origin: "left center",
          translate: ["-5%", 0, -200],
          rotate: [0, 100, 0],e
        },
        next: {
          origin: "right center",
          translate: ["5%", 0, -200],
          rotate: [0, -100, 0],
        }
    },
    centeredSlides: true,
    spaceBetween: 48,
    navigation: {
      nextEl: nextEl,
      prevEl: prevEl,
    },
    pagination: {
      el: dotsEl,
      clickable: true,
      bulletClass: 'dot',
      bulletActiveClass: 'active',
      renderBullet: function (index, className) {
        return '<button type="button" class="' + className + '" aria-label="Go to slide ' + (index + 1) + '"></button>';
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
