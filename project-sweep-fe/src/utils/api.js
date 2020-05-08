import axios from 'axios'

const request = axios.create({
    baseURL: 'https://aisleonator.herokuapp.com/api',
})

export const getProducts = () => {
    return request.get('/products').then(({ data }) => {
        data.products.forEach(
            (product) =>
                (product.foodName =
                    product.foodName.charAt(0).toUpperCase() +
                    product.foodName.substring(1).toLowerCase())
        )
        return data.products
    })
}

export const getCategories = () => {
    return request.get('/category').then(({ data }) => {
        data.categories.forEach(
            (category) =>
                (category.name =
                    category.name.charAt(0).toUpperCase() +
                    category.name.substring(1))
        )
        return data
    })
}

export const getSupermarkets = () => {
    return request.get('/supermarkets').then(({ data }) => {
        return data
    })
}

export const postSupermarkets = (name, aisleInfo, categoryLookup, layout) => {
    return request.post('/supermarkets', {
        name,
        aisleInfo,
        categoryLookup,
        layout,
    })
}

export const insertProduct = (foodName, category) => {
    return request.post('/products', { foodName, category })
}
