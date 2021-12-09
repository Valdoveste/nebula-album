import { modal, modalOverlay, modalPicture } from './Album.js';

export default function showModal(src, alt) {
    modalPicture.src = src;
    modalPicture.alt = alt;
    modal.classList.add('active');
    modalOverlay.classList.add('active');
}
