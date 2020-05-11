import axios from 'axios'

export const getLongLat = (postcode) => {
    return axios
        .get(`https://api.postcodes.io/postcodes/${postcode}`)
        .then(({ data }) => {
            let newLocation = []
            console.log(data.result.longitude, data.result.latitude)
            newLocation.push(data.result.longitude, data.result.latitude)
            return newLocation
        })
}

const request = axios.create({
    baseURL: 'https://aisleonator.herokuapp.com/api',
})

export const getProducts = () => {
    return request.get('/products').then(({ data }) => {
        console.log(data.products)
        const productsData = data.products
        productsData.forEach(
            (product) =>
                (product.foodName =
                    product.foodName.charAt(0).toUpperCase() +
                    product.foodName.substring(1).toLowerCase())
        )

        console.log(productsData[0].foodName)
        const sortedData = productsData.sort((a, b) => {
            if (a.foodName > b.foodName) {
                return 1
            } else if (b.foodName > a.foodName) {
                return -1
            }
        })

        return sortedData
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

export const postSupermarkets = (
    name,
    aisleInfo,
    categoryLookup,
    layout,
    location
) => {
    console.log(name, aisleInfo, categoryLookup, layout, location)
    return request.post('/supermarkets', {
        name,
        aisleInfo,
        categoryLookup,
        layout,
        location,
    })
}

export const insertProduct = (foodName, category) => {
    return request.post('/products', { foodName, category })
}
