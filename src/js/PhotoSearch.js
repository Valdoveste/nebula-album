import getPost, { generatePictureHTML, perPageLimit, pictureContainer } from './Album.js';
import { isMobileDevice } from "./WindowFunctions.js";

export default function searchPhotos(subject){
    document.getElementById('page-number').placeholder = 1;
    let baseURL = `https://api.pexels.com/v1/search?query=${subject}&page=1&per_page=${perPageLimit}`;
    
    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
        if (!(isMobileDevice))
            pictureContainer.innerHTML = "";
            
        generatePictureHTML(data.photos, data.total_results);
    })
}
