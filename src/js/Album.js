import API_KEY from './ApiKey.js'
import searchPhotos from './PhotoSearch.js';
import switchPage from './Pagination.js';
import showModal from './Modal.js';
import windowLoadContent  from './WindowFunctions.js';
import windowInfinityScrollMobile  from './WindowFunctions.js';
import windowWatchResize  from './WindowFunctions.js';

export var index = 1,
    perPageLimit = 5,
    isMobileDevice = false,
    baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=${perPageLimit}`;

export const pictureContainer = document.getElementById('picture-container'),
    modal = document.getElementById('modal'),
    modalPicture = document.getElementById('modal-picture'),
    modalOverlay = document.getElementById('modal-overlay');

const btnNextPage = document.getElementById('next-page'),
    btnPrevPage = document.getElementById('prev-page'),
    searchSubject = document.getElementById('search-subject'),
    fabGrid = document.getElementById('fab-main-grid');

export default function getPost(baseURL) {
    const res = fetch(baseURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    });

    return res;
}

export function generatePictureHTML(picture, totalPhotosResults) {
    disablePaginationBtn(totalPhotosResults);

    picture.forEach(picture => {
        const item = document.createElement('div');
        item.classList.add('picture');
        item.innerHTML =
            `
        <div class="overlay">
            <div class="picture-author">
                <a href="${picture.photographer_url}">${picture.photographer}</a>
            </div>
        </div>
        <img src="${picture.src.landscape}" alt="${(picture.url.split('/', 5))[4]}" loading="lazy"></img>
        `
        pictureContainer.appendChild(item);
    });

    const pictureX = document.querySelectorAll('.picture');

    for (let itemsI of pictureX) {
        itemsI.addEventListener('click', (event) => {
            showModal(event.currentTarget.lastElementChild.src, event.currentTarget.lastElementChild.alt);
        });
    }
}

function disablePaginationBtn(totalPhotosResults) {
    let totalPages = (totalPhotosResults / perPageLimit);

    if (totalPages <= 0 || index == totalPages)
        btnNextPage.disabled = true;
    else
        btnNextPage.disabled = false;

    if (index == 1)
        btnPrevPage.disabled = true;
    else 
        btnPrevPage.disabled = false;
}

window.addEventListener("load", () => { windowLoadContent(isMobileDevice); });

window.addEventListener("scroll", () => { windowInfinityScrollMobile(); });

window.addEventListener("resize", () => { windowWatchResize(isMobileDevice); });

searchSubject.addEventListener('change', (subject) => {
    index = 1;
    searchPhotos(subject.target.value);
});

btnNextPage.addEventListener('click', () => {
    switchPage(++index, searchSubject.value);
});

btnPrevPage.addEventListener('click', () => {
    if (!(index - 1) <= 0)
        switchPage(--index, searchSubject.value);
});

fabGrid.addEventListener('click', (fabGrid) => {
    if (fabGrid.target.checked)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    else
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
});

modalOverlay.addEventListener('click', (event) => {
    modal.classList.remove("active");
    event.target.classList.remove("active");
});
