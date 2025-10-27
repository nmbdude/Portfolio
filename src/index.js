import './swiper.js';
import './materialize.js';
import './materialize.min.js';
import './project.js';
import './redirect.js';
import './swiper.min.js';

document.addEventListener("DOMContentLoaded", function() {
    const workAnchors = document.querySelectorAll('.work a');

    workAnchors.forEach(anchor => {
        anchor.style.width = '100%';
        anchor.style.height = '0';
        anchor.style.paddingBottom = '100%'; // This maintains a square aspect ratio
        anchor.style.backgroundPosition = 'center';
        anchor.style.backgroundRepeat = 'no-repeat';
        anchor.style.backgroundSize = 'cover';
    });
});

let viewAllAcademic = document.querySelector('#view-all-academic');
let viewAllPersonal = document.querySelector('#view-all-personal');

viewAllAcademic.addEventListener('click', function() {
    window.open("academic-work.html", "_self");
});

viewAllPersonal.addEventListener('click', function() {
    window.open("personal-work.html", "_self");
});

// Mobile nav toggle: toggle .nav-menu.show when hamburger clicked
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isShown = navMenu.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', isShown ? 'true' : 'false');
        });
    }
});