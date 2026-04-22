import axios from "axios";

const API = axios.create({
  baseURL: "https://real-estate-z99v.onrender.com/api"
});

export default API;