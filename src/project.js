let toggleDropdown = (dropdownElement, dropdownArrow) => {
    if (dropdownElement.style.maxHeight && dropdownElement.style.maxHeight !== '0px') {
        collapseDropdown(dropdownElement, dropdownArrow);
    } else {
        expandDropdown(dropdownElement, dropdownArrow);
    }
}

let expandDropdown = (dropdownElement, dropdownArrow) => {
    dropdownElement.style.maxHeight = dropdownElement.scrollHeight + 'px';
    dropdownArrow.style.transform = 'rotate(180deg)';
    dropdownElement.style.maxHeight = dropdownElement.scrollHeight + 'px';
}

let collapseDropdown = (dropdownElement, dropdownArrow) => {
    dropdownElement.style.maxHeight = '0px';
    dropdownArrow.style.transform = 'rotate(0deg)';
    dropdownElement.style.maxHeight = '0px';
}