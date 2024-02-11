import axios, { isCancel, AxiosError } from 'axios';
import { renderPhoto, simpleLightbox, noImages } from './render-functions';
import iziToast from 'izitoast';
import closeIcon from '../img/bi_x-octagon.png';

export default async function getPhotos(inputSearch, page) {
  try {
    const searchParams = new URLSearchParams({
      key: '42209591-dcd9ad54ecaffcfe9e9b64d04',
      q: `${inputSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page: page,
    });

    const result = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    // const photos = result.json();

    const arrayPhotos = result.data.hits;
    if (arrayPhotos.length === 0) {
      noImages();
    }
    const spanLoader = document.querySelector('.loader');
    renderPhoto(arrayPhotos);
    simpleLightbox();
    spanLoader.remove();
    const load = document.querySelector('.load');
    load.classList.remove('hidden');
  } catch (error) {
    iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: closeIcon,
      position: 'topRight',
      message: `${error}`,
    });
  }
}
