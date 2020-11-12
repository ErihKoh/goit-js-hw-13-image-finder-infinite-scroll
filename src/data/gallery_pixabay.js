
import galleryImagesTpl from '../templates/gallery_image.hbs';
import ImageApiServise from './api-servise';
import refs from './refs';
import InfiniteScroll from "infinite-scroll";
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.delay = 2000;

const imageApiService = new ImageApiServise();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImageclick);

function onImageclick(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const largeImage = e.target.dataset.source;
    // console.log(largeImage);
    const instance = basicLightbox.create(`<img src="${largeImage}" alt="image"  />`);

    instance.show();
}
    
function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {

        clearImageMarkup();
      
        return error({
            title: "Error",
            text: "Please enter query!"
        });
    }
    
    imageApiService.resetPage();
    clearImageMarkup();
    fetchData();
}

async function fetchData() {

    try {
        const { hits } = await imageApiService.fetchImage();
       
          if (hits.length === 0) {
            
            clearImageMarkup();

            return error({
              
                title: "Error",
                text: "Image not found! Repeat query!"
        });
    }
        appendImagesMarkup(hits);
  
    } catch (error) {
        console.log('ошибка в fetchData', error);
    }
    
     imageApiService.incrementPage();
}

function appendImagesMarkup(hits) {
    // let movePage = refs.gallery.offsetHeight;
    refs.gallery.insertAdjacentHTML('beforeend', galleryImagesTpl(hits));

//     window.scrollTo({

//       top: movePage,
//       behavior: "smooth",
      
//   });
}

function clearImageMarkup() {
    refs.gallery.innerHTML = '';
}





const infScroll = new InfiniteScroll(refs.gallery, {
  responseType: "text",
  history: false,
  status: ".page-load-status",
    path() {
         const API_KEY = '18969292-6634fe46747360e3150bf5a1e';
        const BASE_URL = `https://pixabay.com/api`; 
        const PROXY = "https://cors-anywhere.herokuapp.com";
        return `${PROXY}/${BASE_URL}/?image_type=photo&orientation=horizontal&q=${imageApiService.searchName}&page=${imageApiService.pageIndex}&per_page=12&key=${API_KEY}`;
    },
})

infScroll.on("load", (response) => {
    const { hits } = JSON.parse(response);
   
    appendImagesMarkup(hits);
    imageApiService.incrementPage();
  
});
