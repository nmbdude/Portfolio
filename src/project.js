let toggleDropdown = (dropdownElement, dropdownArrow) => {
    if (dropdownElement.style.maxHeight && dropdownElement.style.maxHeight !== '0px') {
        collapseDropdown(dropdownElement, dropdownArrow);
    } else {
        expandDropdown(dropdownElement, dropdownArrow);
    }
}

let expandDropdown = (dropdownElement, dropdownArrow) => {
    if(dropdownElement.querySelector('div')) {
        dropdownElement.style.maxHeight = dropdownElement.scrollHeight + dropdownElement.querySelector('div').scrollHeight + 'px';
    }else{
        dropdownElement.style.maxHeight = dropdownElement.scrollHeight + 'px';
    }
    console.log(dropdownElement.style.maxHeight);
    dropdownArrow.style.transform = 'rotate(180deg)';
}

let collapseDropdown = (dropdownElement, dropdownArrow) => {
    dropdownElement.style.maxHeight = '0px';
    dropdownArrow.style.transform = 'rotate(0deg)';

    // Collapse all nested dropdowns
    let nestedDropdowns = dropdownElement.querySelectorAll('.dropdown');
    nestedDropdowns.forEach(nested => {
        nested.style.maxHeight = '0px';
        let nestedArrow = nested.previousElementSibling.querySelector('.expand-arrow');
        if (nestedArrow) {
            nestedArrow.style.transform = 'rotate(0deg)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Open Lightbox when clicking on an image with the class 'dropdown-image'
    document.querySelectorAll('.dropdown-image').forEach(image => {
        image.addEventListener('click', (e) => {
            e.stopPropagation();
            let lightbox = document.getElementById('lightbox');
            let lightboxImage = document.getElementById('lightbox-img');
            
            if (!lightbox || !lightboxImage) {
                return;
            }
            
            lightboxImage.src = image.src;
            lightboxImage.style.transform = 'scale(1)';
            lightbox.style.display = 'flex';
            lightbox.style.opacity = '1';
            
            // Setup lightbox event listeners
            setupLightboxListeners();
        });
    });
});

let setupLightboxListeners = () => {
    let lightbox = document.getElementById('lightbox');
    let lightboxImage = document.getElementById('lightbox-img');
    
    if (!lightbox || !lightboxImage) return;
    
    // Remove existing listeners
    lightbox.removeEventListener('click', handleLightboxClick);
    lightboxImage.removeEventListener('click', handleImageClick);
    
    // Add listeners
    lightbox.addEventListener('click', handleLightboxClick);
    lightboxImage.addEventListener('click', handleImageClick);
}

let handleLightboxClick = (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
}

let handleImageClick = (e) => {
    e.stopPropagation();
    zoomImage();
}

let closeLightbox = () => {
    let lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

let zoomImage = () => {
    let lightboxImage = document.getElementById('lightbox-img');
    if (!lightboxImage) return;
    
    if (lightboxImage.style.transform === 'scale(1.5)') {
        lightboxImage.style.transform = 'scale(1)';
    } else {
        lightboxImage.style.transform = 'scale(1.5)';
    }
}