const pictureContainer = document.getElementById('picture-container');
const API_KEY = '563492ad6f917000010000019231e1ac10524c74ba3c7a67d31f7464';
var index = 1;
var baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=40`;

var prev = document.getElementById('pag-prev').addEventListener('click', (e) => {
    index--;
    baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=40`;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })

});

var next = document.getElementById('pag-next').addEventListener('click', (e) => {
    index++;
    baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=40`;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })

});

function generatePictureHTML(picture) {
    picture.forEach(picture => {
        const item = document.createElement('div');
        item.classList.add('picture');
        item.innerHTML = `
        <div class="overlay">
            <div class="picture-author">
                <a href="${
            picture.photographer_url
        }">${
            picture.photographer
        }</a>
            </div>
        </div>
        <img src="${
            picture.src.landscape
        }" alt=""></img>
        `
        pictureContainer.appendChild(item);
    });
}

function getPost(baseURL) {
    const res = fetch(baseURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })

    return res;
}

window.onload = function () {
    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        console.log(data.photos[0]);
        generatePictureHTML(data.photos);
    })
}
