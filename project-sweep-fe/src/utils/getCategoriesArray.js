const getCategoriesArray = (categories) => {
    for (let i = categories.length; i < 6; i++) {
        categories.push({ categoryName: '' })
    }

    return categories
}

module.exports = getCategoriesArray
