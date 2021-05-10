import axios from 'axios';

class Pikamovie {
  constructor(key) {
    this.pikamovie = axios.create({
      baseURL: `https://www.omdbapi.com/`,
      params: { apikey: key },
    });
  }

  async initialData() {
    const response = await this.pikamovie.get('', {
      params: {
        type: 'movie',
        s: 'life',
      }
    });
    return response.data.Search;
  }

  async searchByTitle(title) {
    const response = await this.pikamovie.get('', {
      params: {
        type: 'movie',
        s: title,
      }
    });
    return response.data.Search;
  }

  async searchById(id) {
    const response = await this.pikamovie.get('', {
      params: {
        type: 'movie',
        i: id,
      }
    });
    return response.data;
  }
}

export default Pikamovie;