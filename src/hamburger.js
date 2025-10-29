const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list-overlay');
const navListClose = document.querySelector('.nav-list-close');

hamburger.addEventListener('click', function() {
    navList.setAttribute('style', 'display: block; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9);');
    navListClose.setAttribute('style', 'display: block; position: absolute; top: 20px; right: 20px; font-size: 30px; color: white; cursor: pointer;');
});

navListClose.addEventListener('click', function() {
    navList.setAttribute('style', 'display: none;');
});