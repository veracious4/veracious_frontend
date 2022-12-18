import axios from 'axios';
const accessURL = "http://127.0.0.1:8000/"
const record =  axios.create({
    baseURL:accessURL
})

const authRecord =(token) => axios.create({
    baseURL: accessURL,
    headers: {'Authorization': 'Token '+ token}
});

export {authRecord, record, accessURL}