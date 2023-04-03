const axios = require("axios");
const instance = axios.create({
    baseURL: "http://localhost:5000/"
})
export const get = async (url, headers = {},params = {}) => {
    try {
      const response = await instance.get(url, {headers, params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const post = async (url, data,headers = {}) => {
    try {
      const response = await instance.post(url, data,{headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const put = async (url, data,headers = {}) => {
    try {
      const response = await instance.put(url, data,{headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export default instance;
