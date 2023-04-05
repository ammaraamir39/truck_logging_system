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
      throw error.message;
    }
  };
  
export const post = async (url, data,headers = {'authorization':localStorage.getItem('accessToken')}) => {
    try {
      console.log("headers = > ",headers)
      const response = await instance.post(url, data,{headers});
      console.log("Response= > ",response)
      if(response.data.message) return response.data
      
    } catch (error) {
      console.log("Error = > ",error.message)
      throw error.message;
    }
  };

  export const put = async (url, data,headers = {'authorization':localStorage.getItem('accessToken')}) => {
    try {
      const response = await instance.put(url, data,{headers});
      return response.message;
    } catch (error) {
      throw error.message;
    }
  };
  
  export const del = async(url,headers={'authorization':localStorage.getItem('accessToken')})=>{
    try {
      const response = await instance.delete(url,{headers})
      return response.data
    } catch (error) {
      throw error.message
    }
  }
export default instance;
