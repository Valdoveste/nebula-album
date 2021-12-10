import { modal, modalOverlay, modalPicture } from './Album.js';

export default function showModal(src, alt, isSmartPhoneModal) {

    console.log(isSmartPhoneModal);
    if(isSmartPhoneModal)
        src = src.replace("h=627", "h=1200").replace("w=1200", "w=800");
    else if(!(isSmartPhoneModal) && src.search('w=800') > 1)
        src = src.replace("h=1200", "h=1200").replace("w=800", "w=1200");

    modalPicture.src = src;
    modalPicture.alt = alt;
    modal.classList.add('active');
    modalOverlay.classList.add('active');
}
