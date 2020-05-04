// const foods = require('../staticData/foods')

const sortListItems = (unsortedList) => {
    const foodCategoryArr = []

    unsortedList.forEach((item) => {
        let foodCategoryObj = {}
        let categoryMatch = foodCategoryArr.find((category) => {
            return category.name === item.category.name
        })

        if (!categoryMatch) {
            foodCategoryObj.name = item.category.name
            foodCategoryObj.items = [`${item.quantity} ${item.foodName}`]
            foodCategoryArr.push(foodCategoryObj)
        } else {
            categoryMatch.items.push(`${item.quantity} ${item.foodName}`)
        }
    })

    return foodCategoryArr
}

module.exports = sortListItems
