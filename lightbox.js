document.addEventListener('DOMContentLoaded', initLightbox);


function initLightbox() {
    let images = document.querySelectorAll('img');
    images.forEach(image => {
        image.classList.add('lightbox');
        image.addEventListener('click', function() {
            let lightbox = document.createElement('div');
            lightbox.classList.add('lightbox-overlay');
            lightbox.innerHTML = `<img src="${this.src}" alt="${this.alt}">`;
            document.body.appendChild(lightbox);

            document.body.addEventListener('mousedown', closeLightbox)
                

        });
    });
}

    function closeLightbox(event) {
        document.body.removeChild(document.querySelector('.lightbox-overlay'));
        document.removeEventListener('click', closeLightbox);
    }