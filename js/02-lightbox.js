import { galleryItems } from './gallery-items.js';

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt = "" title="${description}" />
        </a>
    `
    }).join('');
}
const galleryList = document.querySelector('.gallery');
const imagesMarkup = createGalleryMarkup(galleryItems);

galleryList.insertAdjacentHTML('beforeend', imagesMarkup);

let gallery = new SimpleLightbox('.gallery a',
    {
        overlayOpacity: 1,
        captionDelay: 250,
    });