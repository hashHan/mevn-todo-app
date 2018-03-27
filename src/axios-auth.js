import axios from 'axios';

// const env = process.env.NODE_ENV || 'development';
// if (env === 'development' || env === 'test') {
//   const baseURL = 'http://localhost:3000/';
// }else{
//   const baseURL = 'https://bloghaeseong.firebaseio.com/'; //FOR database
// }

// above doesn't work!

const instance = axios.create({
    baseURL: 'https://mysterious-woodland-17947.herokuapp.com/'
  })

export default instance