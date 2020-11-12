import InfiniteScroll from 'infinite-scroll';

const API_KEY = '18969292-6634fe46747360e3150bf5a1e';
const BASE_URL = `https://pixabay.com/api`; 

const infScroll = new InfiniteScroll('.conteiner', {
    path() {
         const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchName}&page=${this.pageIndex}&per_page=12&key=${API_KEY}`;
        return url;
    }
})