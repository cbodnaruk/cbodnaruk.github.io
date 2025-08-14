document.addEventListener('DOMContentLoaded', initBurgerMenu);

function initBurgerMenu() {
    const menu = document.querySelector('.header-buttons');
    const menuButton = document.querySelector('#menu-button');

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

}