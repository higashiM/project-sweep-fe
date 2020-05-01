const foods = require('../staticData/foods')

const sortListItems = (unsortedList) => {
    const foodCategoryArr = []

    unsortedList.forEach((item) => {
        let foodCategoryObj = {}
        let categoryMatch = foodCategoryArr.find((category) => {
            return category.categoryName === item.category
        })

        if (categoryMatch) {
            categoryMatch.items.push(`${item.quantity} ${item.foodName}`)
        } else {
            foodCategoryObj.categoryName = item.category
            foodCategoryObj.items = [`${item.quantity} ${item.foodName}`]
            foodCategoryArr.push(foodCategoryObj)
        }
    })
    return foodCategoryArr
}

sortListItems(foods)

module.exports = sortListItems
