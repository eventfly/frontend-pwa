import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: 'http://auth:3000',
            headers: {
                ... req.headers,
               'authorization': ' xxxxxxxxxx' ,
               'Content-Type': 'application/json'
             
            } 
        })
    } else {
        return axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                ... req.headers,
               'authorization': ' xxxxxxxxxx' ,
               'Content-Type': 'application/json'
             
            }  
        })
    }
}