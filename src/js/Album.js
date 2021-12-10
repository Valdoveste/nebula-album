import API_KEY from './ApiKey.js'
import searchPhotos from './PhotoSearch.js';
import switchPage from './Pagination.js';
import showModal from './Modal.js';

export var perPageLimit = 40;
export const pictureContainer = document.getElementById('picture-container');
export const modal = document.getElementById('modal');
export const modalPicture = document.getElementById('modal-picture');
export const modalOverlay = document.getElementById('modal-overlay');

var index = 1;
var isSmartPhone = false;
var baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=${perPageLimit}`;
const btnNextPage = document.getElementById('next-page'),
    btnPrevPage = document.getElementById('prev-page');

const searchSubject = document.getElementById('search-subject');
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
            showModal(event.currentTarget.lastElementChild.src, event.currentTarget.lastElementChild.alt, isSmartPhone);
        });
    }
}

modalOverlay.addEventListener('click', (event) => {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
});

function disablePaginationBtn(totalPhotosResults) {
    let totalPages = (totalPhotosResults / perPageLimit);

    if (totalPages <= 0 || index == totalPages) {
        btnNextPage.disabled = true;
    }
    else {
        btnNextPage.disabled = false;
    }

    if (index == 1) {
        btnPrevPage.disabled = true;
    }
    else {
        btnPrevPage.disabled = false;
    }
}

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

window.addEventListener("load", (e) => {
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
        isSmartPhone = true;
    }

    if (window.screen.availWidth > 900) {
        isSmartPhone = false;
    }

});

window.addEventListener("resize", (e) => {
    if (window.screen.availWidth <= 450 || window.screen.availWidth >= 800) {
        isSmartPhone = true;
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    }
    if (window.screen.availWidth > 900) {
        isSmartPhone = false;
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(420px, 1fr))";
    }
});

const fabGrid = document.getElementById('fab-main-grid').addEventListener('click', (fabGrid) => {
    if (fabGrid.target.checked)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    else
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
});
