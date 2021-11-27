const pictureContainer = document.getElementById('picture-container');
// const API_KEY = '';
const limit = 40;
var pagIndex = 1;
var baseURL = `https://api.pexels.com/v1/curated?page=${pagIndex}&per_page=${limit}`;

const searchedSubject = document.getElementById('search-subject');

searchedSubject.addEventListener('change', (input) => {
    searchPhoto(input.target.value);
});

const inputPage = document.getElementById('pag-number');

inputPage.value = pagIndex;

inputPage.addEventListener('change', (input) => {
    pagination(input.target.value, searchedSubject.value)
});

const btnPagNext = document.getElementById('pag-prev').addEventListener('click', () => {
    if ((pagIndex - 1) != 0) 
        pagination(--pagIndex, searchedSubject.value);
});

const btnPagPrev = document.getElementById('pag-next').addEventListener('click', () => pagination(++pagIndex, searchedSubject.value));

function requestAccessAPI(baseURL) {
    const res = fetch(baseURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })

    return res;
}

function searchPhoto(searchedSubject) {
    inputPage.value = 1;
    baseURL = `https://api.pexels.com/v1/search?query=${searchedSubject}&page=1&per_page=${limit}`

    requestAccessAPI(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })
}

function pagination(pagIndex, searchedSubject) {
    inputPage.value = pagIndex;
    if (searchedSubject.length == 0) {
        baseURL = `https://api.pexels.com/v1/curated?page=${pagIndex}&per_page=${limit}`;
    } else {
        baseURL = `https://api.pexels.com/v1/search?query=${searchedSubject}&page=${pagIndex}&per_page=${limit}`
    } 

    requestAccessAPI(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })
}

function generatePictureHTML(pictures) {
    pictures.forEach(picture => {
        const item = document.createElement('div');
        item.classList.add('picture');
        item.innerHTML = `
        <div class="overlay">
            <div class="picture-author">
                <a href="${
            picture.photographer_baseURL
        }">${
            picture.photographer
        }</a>
            </div>
        </div>
        <img src="${
            picture.src.landscape
        }" alt="" loading="lazy"></img>
        `
        pictureContainer.appendChild(item);
    });
}

window.onload = function () {
    requestAccessAPI(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        generatePictureHTML(data.photos);
    })
}
