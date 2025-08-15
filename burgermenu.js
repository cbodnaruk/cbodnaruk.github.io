document.addEventListener('DOMContentLoaded', initBurgerMenu);

function initBurgerMenu() {
    const menu = document.querySelector('.header-buttons');
    const menuButton = document.querySelector('#menu-button');

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        if (menu.classList.contains('open')) document.body.addEventListener('click',closeBurger)
    });

}

function closeBurger(e){
    const menuButton = document.querySelector('#menu-button');
    const menu = document.querySelector('.header-buttons');
    if (e.target != menu && e.target != menuButton){
        menu.classList.remove('open')
        document.body.removeEventListener('click',closeBurger)

    }
}