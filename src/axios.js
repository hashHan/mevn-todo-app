import axios from 'axios';

const env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  baseURL = 'http://localhost:3000/';
}else{
  baseURL = 'https://bloghaeseong.firebaseio.com/'; //FOR database
}

const instance = axios.create({
    baseURL
  })

export default instance