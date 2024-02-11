import iziToast from "izitoast";
import pixsbyApi from "./js/pixaby-api"
import closeIcon from './img/bi_x-octagon.png';

const form = document.querySelector('form');



form.addEventListener('submit', onSearchButton);


function onSearchButton(e){
    e.preventDefault();
    
    const inputSearch = form.elements.search.value;
    if (inputSearch === ""){
        iziToast.error({
        messageColor: '#FFF',
        color: '#EF4040',
        iconUrl: closeIcon,
        position: 'topRight',
        message: 'Please,enter what do you want to find!',
        });
        return
    }
    form.insertAdjacentHTML('afterend', '<span class="loader"></span>');
    const list = document.querySelector('.gallery');
    list.innerHTML = '';
  
    pixsbyApi(inputSearch)
  form.reset()
}
