import { perPageLimit, pictureContainer } from "./Album.js";
import { generatePictureHTML } from './Album.js';
import getPost  from './Album.js';

export default function searchPhotos(subject){
    let pageNumber = document.getElementById('page-number').placeholder = 1;
    let baseURL = `https://api.pexels.com/v1/search?query=${subject}&page=1&per_page=${perPageLimit}`;
    
    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        pictureContainer.innerHTML = "";
        generatePictureHTML(data.photos, data.total_results);
    })
}
