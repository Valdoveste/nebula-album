import { index, baseURL, pictureContainer, isMobileDevice } from "./Album.js";
import { generatePictureHTML } from './Album.js';
import getPost from './Album.js';

export default function windowLoadContent(isMobileDevice){
    document.getElementById('page-number').placeholder = index;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        generatePictureHTML(data.photos, data.total_results);
    });

    let main = setInterval(() => {
        document.getElementById('main').style.height = "auto";
        clearInterval(main)
    }, 500);

    if (window.screen.availWidth <= 450 || window.screen.availWidth >= 800) {
        isMobileDevice = true;
    }

    if (window.screen.availWidth > 900) {
        isMobileDevice = false;
    }
}

export function windowInfinityScrollMobile(){

    let windowHeight = document.documentElement.offsetHeight,
        windowScrollTop = document.documentElement.scrollTop,
        windowScrollHeight = document.documentElement.scrollHeight;

    if (((windowHeight + windowScrollTop) >= (windowScrollHeight - 250)) && isMobileDevice)
        switchPage(++index, searchSubject.value);
}

export function windowWatchResize(isMobileDevice){
    if (window.screen.availWidth <= 450 || window.screen.availWidth >= 800) {
        isMobileDevice = true;
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    }
    if (window.screen.availWidth > 900) {
        isMobileDevice = false;
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(420px, 1fr))";
    }
}
