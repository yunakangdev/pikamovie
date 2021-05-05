class Pictamovie {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  }

  async initialData() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${this.key}&s=life&type=movie`, this.getRequestOptions);
    const result = await response.json();
    return result.Search;
  }

  async search(query) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${this.key}&s=${query}&type=movie`, this.getRequestOptions);
    const result = await response.json();
    return result.Search;
  }
}

export default Pictamovie;