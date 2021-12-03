import { perPageLimit, pictureContainer } from "./Album.js";
import { generatePictureHTML } from './Album.js';
import getPost from './Album.js';
var baseURL;

export default function nextPage(index, subject) {
    // console.log("page: ",index, "searchd: ",subject);
    let pageNumber = document.getElementById('page-number').placeholder = index; 
    if (subject == "")
        baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=${perPageLimit}`;
    else
        baseURL = `https://api.pexels.com/v1/search?query=${subject}&page=${index}&per_page=${perPageLimit}`;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })
}

export function previusPage(index, subject) {
    // console.log("page: ",index, "searchd: ",subject);
    let pageNumber = document.getElementById('page-number').placeholder = index;
    if (subject == "")
        baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=${perPageLimit}`;
    else
        baseURL = `https://api.pexels.com/v1/search?query=${subject}&page=${index}&per_page=${perPageLimit}`;

    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos);
    })

}
