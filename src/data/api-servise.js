const API_KEY = '18969292-6634fe46747360e3150bf5a1e';
const BASE_URL = `https://pixabay.com/api`; 


export default class ImageApiServise {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }

  async  fetchImage() {
    //    console.log(this)
    
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchName}&page=${this.page}&per_page=12&key=${API_KEY}`;
      const fetchImage = await fetch(url);
      const responceImage = await fetchImage.json();  
           
      return responceImage;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchName;
    }
    set query(newSearchName) {
        this.searchName = newSearchName;
    }
}
