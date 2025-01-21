import axios from "axios";
import { apiUrl } from "./../config.json"
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default class API {
  constructor() {
    this.http = axios;
    this.baseURL = apiUrl || "/";
  }

  getUrl(url = "", baseURL = "") {
    if (baseURL) {
      return baseURL + url;
    }
    return this.baseURL + url;
  }

  request(config = {}) {
    return this.http.request(config);
  }

  get(url = "", config = {}, baseURL = "") {
    return this.http.get(this.getUrl(url, baseURL), config);
  }

  post(url = "", body, config = {}) {
    return this.http.post(this.getUrl(url), body, config);
  }

  patch(url = "", body, config = {}) {
    return this.http.patch(this.getUrl(url), body, config);
  }

  put(url = "", body, config = {}) {
    return this.http.put(this.getUrl(url), body, config);
  }

  delete(url = "", body, config = {}) {
    return this.http.delete(this.getUrl(url), body, config);
  }
}
