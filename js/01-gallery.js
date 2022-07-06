import { galleryItems } from './gallery-items.js';

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </div>
    `
    }).join('');
}

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

galleryContainer.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
    event.preventDefault();
    const isImage = event.target.classList.contains('gallery__image');
    if (!isImage) {
        return;
    }
    const fullImageUrl = event.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${fullImageUrl}">`);

    instance.show();

    window.addEventListener('keydown', onKeyboardClose);
    divLightbox.classList.add("is-open");
}

function onKeyboardClose(event) {
    if (event.keyCode === 27) {
        closeFullImage();
        window.removeEventListener('keydown', onKeyboardClose);
    }
}

function closeFullImage() {
    const divLightbox = document.querySelector("div.basicLightbox");
    setTimeout(() => {
        if (divLightbox.classList.contains("basicLightbox--visible")) {
            divLightbox.parentElement.removeChild(divLightbox);
        }
    }, 410);
}
