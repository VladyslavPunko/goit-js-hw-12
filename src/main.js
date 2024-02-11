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

function onClickMore(e) {
  page += 1;

  onSearchButton(e);
}

function onSearchButton(e) {
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

  pixsbyApi(inputSearch, page);
  form.reset();
}
