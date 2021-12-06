import API_KEY from './ApiKey.js'
import searchPhotos from './PhotoSearch.js';
import switchPage from './Pagination.js';

var index = 1;
export var perPageLimit = 40;
export const pictureContainer = document.getElementById('picture-container');

const searchSubject = document.getElementById('search-subject');
var baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=${perPageLimit}`;

searchSubject.addEventListener('change', (subject) => {
    searchPhotos(subject.target.value);
});

const btnNextPage = document.getElementById('next-page').addEventListener('click', () => {
    switchPage(++index, searchSubject.value);
});

const btnPrevPage = document.getElementById('prev-page').addEventListener('click', () => {
    if (!(index - 1) <= 0)
        switchPage(--index, searchSubject.value);
});

export function generatePictureHTML(picture) {
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
}

export default function getPost(baseURL) {
    const res = fetch(baseURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })

    return res;
}

window.addEventListener("load", (e) => {
    document.getElementById('page-number').placeholder = index;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        generatePictureHTML(data.photos);
    })

    setInterval(() => {
        let main = document.getElementById('main').style.height = "auto";
    }, 500);
});

window.addEventListener("resize", (e) => {
    if (window.screen.availWidth <= 450 || window.screen.availWidth >= 800)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    if (window.screen.availWidth > 900)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(420px, 1fr))";
});

const fabGrid = document.getElementById('fab-main-grid').addEventListener('click', (fabGrid) => {
    if (fabGrid.target.checked)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    else
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
});
