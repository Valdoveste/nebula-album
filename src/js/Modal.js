import { modal, modalOverlay, modalPicture, closeModal } from './Album.js';
import { isMobileDevice } from "./WindowFunctions.js";

export default function showModal(src, alt) {
    document.getElementsByTagName('body')[0].style.overflowY = "hidden";
    
    if (isMobileDevice)
        src = src.replace("h=627", "h=1200").replace("w=1200", "w=800");
    else if (!(isMobileDevice) && src.search('w=800') > 1)
        src = src.replace("h=1200", "h=1200").replace("w=800", "w=1200");

    modal.addEventListener('transitionend', (event) => {
        if (event.target.id == 'modal') {
            let timerHide = setInterval(() => {
                closeModal.style.opacity = "0";
                clearInterval(timerHide)
            }, 1500);
        }
    });

    modalPicture.src = src;
    modalPicture.alt = alt;
    modal.classList.add('active');
    modalOverlay.classList.add('active');
}
