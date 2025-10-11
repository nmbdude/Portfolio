const $ = selector => {
  return document.querySelector(selector);
};

// Array of image sources for the carousel
const images = [
  "../../media/images/project-screenshots/amiibo-center/amiibo-homepage.png",
  "../../media/images/project-screenshots/amiibo-center/amiibo-search.png", 
  "../../media/images/project-screenshots/amiibo-center/amiibo-result.png"
];

let currentIndex = 2; // Starting with result image as active

function createImageElement(src) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = "Amiibo Center Screenshot";
  return img;
}

function next() {
  if ($(".hide")) {
    $(".hide").remove(); 
  }

  /* Step */
  if ($(".prev")) {
    $(".prev").classList.add("hide");
    $(".prev").classList.remove("prev");
  }

  $(".act").classList.add("prev");
  $(".act").classList.remove("act");

  $(".next").classList.add("act");
  $(".next").classList.remove("next");

  /* New Next */
  $(".new-next").classList.remove("new-next");

  const addedEl = document.createElement('div');
  addedEl.classList.add("carousel-item");
  currentIndex = (currentIndex + 2) % images.length;
  addedEl.appendChild(createImageElement(images[currentIndex]));
  
  $(".list").appendChild(addedEl);
  addedEl.classList.add("next","new-next");
}

function prev() {
  $(".new-next").remove();
    
  /* Step */
  $(".next").classList.add("new-next");

  $(".act").classList.add("next");
  $(".act").classList.remove("act");

  $(".prev").classList.add("act");
  $(".prev").classList.remove("prev");

  /* New Prev */
  $(".hide").classList.add("prev");
  $(".hide").classList.remove("hide");

  const addedEl = document.createElement('div');
  addedEl.classList.add("carousel-item");
  currentIndex = (currentIndex - 2 + images.length) % images.length;
  addedEl.appendChild(createImageElement(images[currentIndex]));

  $(".list").insertBefore(addedEl, $(".list").firstChild);
  addedEl.classList.add("hide");
}

slide = element => {
  /* Next slide */
  if (element.classList.contains('next') || element.parentElement.classList.contains('next')) {
    next();
    
  /* Previous slide */
  } else if (element.classList.contains('prev') || element.parentElement.classList.contains('prev')) {
    prev();
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const slider = $(".list");
  const swipe = new Hammer($(".swipe"));

  if (slider) {
    slider.onclick = event => {
      slide(event.target);
    }
  }

  if (swipe) {
    swipe.on("swipeleft", (ev) => {
      next();
    });

    swipe.on("swiperight", (ev) => {
      prev();
    });
  }
});

let currentCenterIndex = 1; // Start with result image in center
let isTransitioning = false;

function switchToImage(direction) {
  if (isTransitioning) return; // Prevent rapid clicking
  
  isTransitioning = true;
  
  // Update the center index
  currentCenterIndex = (currentCenterIndex - direction + images.length) % images.length;
  
  // Get carousel elements
  const leftEl = document.getElementById('carousel-left');
  const centerEl = document.getElementById('carousel-center');
  const rightEl = document.getElementById('carousel-right');
  
  // Calculate new indices
  const leftIndex = (currentCenterIndex - 1 + images.length) % images.length;
  const rightIndex = (currentCenterIndex + 1) % images.length;
  
  // Phase 1: Fade out all images
  leftEl.style.opacity = '0';
  centerEl.style.opacity = '0';
  rightEl.style.opacity = '0';
  
  // Phase 2: After fade out, update sources and fade in
  setTimeout(() => {
    // Update all image sources
    leftEl.querySelector('img').src = images[leftIndex];
    centerEl.querySelector('img').src = images[currentCenterIndex];
    rightEl.querySelector('img').src = images[rightIndex];
    
    // Reset all elements to their proper states
    leftEl.style.transform = 'scale(0.9)';
    leftEl.style.width = '350px';
    leftEl.style.height = '280px';
    leftEl.style.opacity = '0.7';
    
    centerEl.style.transform = 'scale(1)';
    centerEl.style.width = '500px';
    centerEl.style.height = '400px';
    centerEl.style.opacity = '1';
    
    rightEl.style.transform = 'scale(0.9)';
    rightEl.style.width = '350px';
    rightEl.style.height = '280px';
    rightEl.style.opacity = '0.7';
    
    isTransitioning = false;
  }, 300);
}

function updateCarousel() {
  // Calculate indices for left, center, right
  const leftIndex = (currentCenterIndex - 1 + images.length) % images.length;
  const rightIndex = (currentCenterIndex + 1) % images.length;
  
  // Update image sources
  document.getElementById('left-img').src = images[leftIndex];
  document.getElementById('center-img').src = images[currentCenterIndex];
  document.getElementById('right-img').src = images[rightIndex];
}

function resetCarouselPositions() {
  const leftEl = document.getElementById('carousel-left');
  const centerEl = document.getElementById('carousel-center');
  const rightEl = document.getElementById('carousel-right');
  
  // Reset all positions to their default states
  leftEl.style.transform = 'scale(0.9)';
  leftEl.style.opacity = '0.7';
  leftEl.style.width = '350px';
  leftEl.style.height = '280px';
  leftEl.style.zIndex = '1';
  
  centerEl.style.transform = 'scale(1)';
  centerEl.style.opacity = '1';
  centerEl.style.width = '500px';
  centerEl.style.height = '400px';
  centerEl.style.zIndex = '3';
  
  rightEl.style.transform = 'scale(0.9)';
  rightEl.style.opacity = '0.7';
  rightEl.style.width = '350px';
  rightEl.style.height = '280px';
  rightEl.style.zIndex = '1';
}

function updateCarousel() {
  // Calculate indices for left, center, right
  const leftIndex = (currentCenterIndex - 1 + images.length) % images.length;
  const rightIndex = (currentCenterIndex + 1) % images.length;
  
  // Update image sources
  document.getElementById('left-img').src = images[leftIndex];
  document.getElementById('center-img').src = images[currentCenterIndex];
  document.getElementById('right-img').src = images[rightIndex];
}

// Lightbox functionality
function openLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const centerImg = document.getElementById('center-img');
  
  lightboxImg.src = centerImg.src;
  lightbox.style.display = 'flex';
  
  // Trigger fade in
  setTimeout(() => {
    lightbox.style.opacity = '1';
  }, 10);
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  
  lightbox.style.opacity = '0';
  
  setTimeout(() => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

// Add hover effects and initialize
document.addEventListener('DOMContentLoaded', function() {
  updateCarousel();
  
  // Add hover effects for arrow buttons
  const arrows = document.querySelectorAll('.carousel-arrow');
  arrows.forEach(arrow => {
    arrow.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(0,0,0,0.9)';
      this.style.transform = 'translateY(-50%) scale(1.1)';
    });
    arrow.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(0,0,0,0.7)';
      this.style.transform = 'translateY(-50%) scale(1)';
    });
  });
  
  // Add hover effect to center image
  const centerImage = document.getElementById('carousel-center');
  centerImage.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.02)';
    this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.4)';
  });
  centerImage.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
  });
});