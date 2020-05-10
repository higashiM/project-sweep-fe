const sortAisleInput = (unsortedList) => {
    const aisleCategoryArr = []
    const sortedList = unsortedList.sort((a, b) => {
        return a[1] - b[1]
    })

    sortedList.forEach((item) => {
        let aisleObj = {}
        let aisleMatch = aisleCategoryArr.find((aisle) => {
            console.log(aisle)
            return aisle.number === item[1]
        })
        if (!aisleMatch) {
            aisleObj.number = item[1]
            aisleObj.categories = [item[0]]
            aisleCategoryArr.push(aisleObj)
        } else {
            aisleMatch.categories.push(item[0])
        }
    })
    console.log(aisleCategoryArr)
    return aisleCategoryArr
}

module.exports = sortAisleInput
