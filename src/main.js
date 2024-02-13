import iziToast from 'izitoast';
import pixsbyApi from './js/pixaby-api';
import closeIcon from './img/bi_x-octagon.png';
import { showSpiner, hideSpiner } from './js/pixaby-api';

const form = document.querySelector('form');
const load = document.querySelector('.load');
const loaderMore = document.querySelector('.loaderMore');
// console.log(load);

// load.classList.add("hidden")

form.addEventListener('submit', onSearch);
load.addEventListener('click', onClickMore);

let page = 1;
let inputSearch;

function onSearch(e) {
  page = 1;
  inputSearch = form.elements.search.value;
  const list = document.querySelector('.gallery');
  list.innerHTML = '';

  onSearchButton(e);
}

async function onClickMore(e) {
  page += 1;
  const totalPage = await onSearchButton(e);

  if (page >= totalPage) {
    iziToast.error({
      messageColor: '#FFF',
      color: 'blue',
      iconUrl: closeIcon,
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  smoothScroll();
}

async function onSearchButton(e) {
  e.preventDefault();

  if (inputSearch === '') {
    iziToast.error({
      messageColor: '#FFF',
      color: '#EF4040',
      iconUrl: closeIcon,
      position: 'topRight',
      message: 'Please,enter what do you want to find!',
    });
    return;
  }

  const totalPage = await pixsbyApi(inputSearch, page);

  // if (hists.length === 0) {
  //   const load = document.querySelector('.load');

  //   load.classList.add('hidden');
  // }

  form.reset();
  return totalPage;
}

function smoothScroll() {
  const galleryCardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: galleryCardHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}
