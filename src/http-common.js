import axios from "axios";
// import authHeader from './auth-header';

export default axios.create({
  baseURL: "http://api-ufaautoapp.herokuapp.com/api/admin/",
  headers: {
    "Content-type": "application/json"
  }
});