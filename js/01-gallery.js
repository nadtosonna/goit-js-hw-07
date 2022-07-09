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
    <img src="${fullImageUrl}">`, {
        onShow: () => {
            window.addEventListener('keydown', onKeyboardClose);
        },
        onClose: () => {
            window.removeEventListener('keydown', onKeyboardClose);
        }
    });
    instance.show();
    window.param = instance;
}

function onKeyboardClose(event) {
    if (event.keyCode === 27) {
        event.currentTarget.param.close(() => window.removeEventListener('keydown', onKeyboardClose));
    }
}
