import getPost, { generatePictureHTML, baseURL, pictureContainer } from './Album.js';

export var isMobileDevice = false;

export default function windowLoadContent(index) {
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

// export function windowInfinityScrollMobile(index, windowHeight, windowScrollTop, windowScrollHeight, flag) {
//     if (((windowHeight + windowScrollTop) >= (windowScrollHeight - 250)) && isMobileDevice && flag) {
//         switchPage(++index, "");
//         // flag = false;
//     }
//     // console.log(flag)
// }

export function windowWatchResize() {
    if (window.screen.availWidth <= 450 || window.screen.availWidth >= 800) {
        isMobileDevice = true;
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    }
    if (window.screen.availWidth > 900) {
        isMobileDevice = false;
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(420px, 1fr))";
    }
}
