import axios from 'axios'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const instance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 500000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const responseBody = (response) => response.data;

const requests = {
    get: (url, body, headers) =>
        instance.get(url, body, headers).then(responseBody),

    post: (url, body) => 
        instance.post(url,body).then(responseBody),

    put: (url, body, headers) =>
        instance.put(url, body, headers).then(responseBody),
}

export default requests;