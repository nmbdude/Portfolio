// // Vanilla carousel + lightbox (no Slick/jQuery)

// // Swiper 6 initialization for Amiibo Center gallery
// // Assumes Swiper 6 CSS/JS is loaded in the page



// document.addEventListener('DOMContentLoaded', function() {

//   var swiper = new window.Swiper('.swiper', {
//     grabCursor: true,
//     effect: 'creative',
//     creativeEffect: {
//       prev: {
//           shadow: true,
//           origin: "left center",
//           translate: ["-5%", 0, -200],
//           rotate: [0, 100, 0],
//         },
//         next: {
//           origin: "right center",
//           translate: ["5%", 0, -200],
//           rotate: [0, -100, 0],
//         }
//     },
//     slidesPerView: 1,
//     centeredSlides: true,
//     spaceBetween: 48,
//     navigation: {
//       nextEl: '.carousel-arrow.right',
//       prevEl: '.carousel-arrow.left',
//     },
//     pagination: {
//       el: '.carousel-dots',
//       clickable: true,
//       bulletClass: 'dot',
//       bulletActiveClass: 'active',
//       renderBullet: function (index, className) {
//         return '<button type="button" class="' + className + '" aria-label="Go to slide ' + (index + 1) + '"></button>';
//       }
//     },
//     on: {
//       slideChange: function() {
//         // Center/side scaling
//         document.querySelectorAll('.swiper-slide').forEach((s, i) => {
//           s.classList.toggle('is-center', i === swiper.activeIndex);
//         });
//       }
//     }
//   });

//   // Lightbox open on image click
//   document.querySelectorAll('.swiper-slide img').forEach(img => {
//     img.addEventListener('click', function() {
//       if (window.openLightbox) window.openLightbox(img.src);
//     });
//   });

//   // Expose closeLightbox/openLightbox for inline markup
//   window.closeLightbox = function() {
//     const lb = document.getElementById('lightbox');
//     if (!lb) return;
//     lb.style.opacity = '0';
//     setTimeout(() => {
//       lb.style.display = 'none';
//     }, 300);
//   };
//   window.openLightbox = function(src) {
//     const lb = document.getElementById('lightbox');
//     const lbImg = document.getElementById('lightbox-img');
//     if (!lb || !lbImg) return;
//     lbImg.src = src;
//     lb.style.display = 'flex';
//     requestAnimationFrame(() => {
//       lb.style.opacity = '1';
//     });
//   };

//   // Close on overlay click (but ignore clicks on the image itself)
//   document.addEventListener('click', (e) => {
//     const lb = document.getElementById('lightbox');
//     if (!lb) return;
//     if (e.target === lb) {
//       window.closeLightbox();
//     }
//   });

//   // Close on ESC
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') window.closeLightbox();
//   });
// });