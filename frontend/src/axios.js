const axios = require("axios");
const instance = axios.create({
    baseURL: "http://localhost:5000/"
})
export const get = async (url, headers = {'authorization':localStorage.getItem('accessToken')},params = {}) => {
    try {
    
      const response = await instance.get(url, {headers, params });
      if(response.message) return response.message
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const post = async (url, data,headers = {'authorization':localStorage.getItem('accessToken')}) => {
    try {
      console.log("headers = > ",headers)
      const response = await instance.post(url, data,{headers});
      console.log("Response= > ",response)
      if(response.message) return response.message
      return response.data;
    } catch (error) {
      console.log("Error = > ",error)
      throw error;
    }
  };

  export const put = async (url, data,headers = {'authorization':localStorage.getItem('accessToken')}) => {
    try {
      const response = await instance.put(url, data,{headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const del = async(url,headers={'authorization':localStorage.getItem('accessToken')})=>{
    try {
      const response = await instance.delete(url)
      return response.data
    } catch (error) {
      throw error
    }
  }
export default instance;
