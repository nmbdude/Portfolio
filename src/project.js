// document.addEventListener('DOMContentLoaded', function() {
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImg = document.getElementById('lightbox-img');
//     const closeBtn = document.getElementsByClassName('close')[0];
//     const galleryImages = document.querySelectorAll('.carousel a img');
//
//     galleryImages.forEach(img => {
//         img.addEventListener('click', function() {
//             lightbox.style.display = 'block';
//             lightboxImg.src = this.src;
//         });
//     });
//
//     closeBtn.addEventListener('click', function() {
//         lightbox.style.display = 'none';
//     });
//
//     lightbox.addEventListener('click', function(event) {
//         if (event.target === lightbox) {
//             lightbox.style.display = 'none';
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    let elemsCarousel = document.querySelectorAll('.carousel');
    let instancesCarousel = M.Carousel.init(elemsCarousel, {dist: -200, duration: 100});

    let elemsMaterialbox = document.querySelectorAll('.materialboxed');
    let instancesMaterialbox = M.Materialbox.init(elemsMaterialbox);
});