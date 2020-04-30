import axios from 'axios'

const request = axios.create({
    baseURL: 'https://aisleonator.herokuapp.com/api',
})

export const getProducts = () => {
    return request.get('/products').then(({ data }) => {
        return data.products
    })
}
