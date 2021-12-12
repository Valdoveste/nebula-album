import getPost, { generatePictureHTML, perPageLimit, pictureContainer, noResultsFound, modalOverlay} from './Album.js';
import { isMobileDevice } from "./WindowFunctions.js";

export default function searchPhotos(subject){
    document.getElementById('page-number').placeholder = 1;
    let baseURL = `https://api.pexels.com/v1/search?query=${subject}&page=1&per_page=${perPageLimit}`;
    
    getPost(baseURL).then(resp => {
        return resp.json()
    }).then(data => {
            pictureContainer.innerHTML = "";
            if(data.total_results == 0){
                noResultsFound.innerHTML= `Sorry, we couldn't find any matches. For "${subject}"`
                noResultsFound.classList.add("active")
                modalOverlay.classList.add("active")
            }
        generatePictureHTML(data.photos, data.total_results);
    })
}
