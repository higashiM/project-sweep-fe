import axios from 'axios'

const request = axios.create({
    baseURL: 'https://aisleonator.herokuapp.com/api',
})

export const getProducts = () => {
    return request.get('/products').then(({ data }) => {
        return data.products
    })
}

export const getCategories = () => {
    return request.get('/category').then(({ data }) => {
        return data
    })
}

export const getSupermarkets = () => {
    return request.get('/supermarkets').then(({ data }) => {
        return data
    })
}
