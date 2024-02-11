import axios, {isCancel, AxiosError} from 'axios';
import {renderPhoto, simpleLightbox, noImages} from './render-functions';
import iziToast from "izitoast";
import closeIcon from '../img/bi_x-octagon.png';

export default function getPhotos(inputSearch){

    const searchParams = new URLSearchParams({
        key: "42209591-dcd9ad54ecaffcfe9e9b64d04",
        q: `${inputSearch}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    })
    const url = `https://pixabay.com/api/?${searchParams}`;
    return fetch(url)
    .then(response =>{return response.json()})
    .then(photos => {
      
        const arrayPhotos = photos.hits;
        if(arrayPhotos.length === 0){
            noImages();
        }
        const spanLoader = document.querySelector('.loader');
        renderPhoto(arrayPhotos);
        simpleLightbox();
        spanLoader.remove();
    })
    .catch(error => {
        iziToast.error({
            messageColor: '#FFF',
            color: '#EF4040',
            iconUrl: closeIcon,
            position: 'topRight',
            message: `${error}`,
        })
    });
    
    
    }