const axios = require('axios');

export class AxiosService {
  static async get(url: string, headers = {}) {
    return await axios.get(url, headers).then((response: any) => response);
  }
  static async post(url: string, headers = {}, data = {}) {
    return await axios.post(url, data, headers).then((response: any) => response);
  }
}
