import API_KEY from './ApiKey.js'

var index = 1;
const pictureContainer = document.getElementById('picture-container');
var baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;


const fabGrid = document.getElementById('fab-main-grid').addEventListener('click', (fabGrid) => {
    if (fabGrid.target.checked)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    else
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
});


var prev = document.getElementById('pag-prev').addEventListener('click', (e) => {
    index--;
    baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })

});

var next = document.getElementById('pag-next').addEventListener('click', (e) => {
    index++;
    baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;

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
                <a href="${picture.photographer_url
            }">${picture.photographer
            }</a>
            </div>
        </div>
        <img src="${picture.src.landscape
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
        // console.log(data.photos[0]);
        generatePictureHTML(data.photos);
    })
}

window.addEventListener("resize", (e) => {
    if (window.screen.availWidth <= 450 || window.screen.availWidth >= 800)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    if (window.screen.availWidth > 900)
        pictureContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(420px, 1fr))";
});
