import axios from "axios";

const instance = axios.create({
  baseURL: "https://sheet.best/api/sheets/",
});

instance.interceptors.request.use(
  async (config) => {
      config.headers['Content-Type'] = 'application/json';
      return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
