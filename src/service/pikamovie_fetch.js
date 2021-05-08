class PikamovieFetch {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  }

  async initialData() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${this.key}&s=life&type=movie`, this.getRequestOptions);
    const result = await response.json();
    return result.Search;
  }

  async searchByTitle(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${this.key}&s=${title}&type=movie`, this.getRequestOptions);
    const result = await response.json();
    return result.Search;
  }

  async searchById(id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${this.key}&i=${id}&type=movie`, this.getRequestOptions);
    const result = await response.json();
    return result;
  }
}

export default PikamovieFetch;