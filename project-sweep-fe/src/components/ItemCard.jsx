import React from 'react'
import QuantityChanger from './QuantityChanger'
import CategoryDropdown from './CategoryDropdown'

const ItemCard = (props) => {
    const {
        foodName,
        quantity,
        category,
        index,
        handleCategoryChange,
        categories,
        deleteListItem,
        incrementQuantity,
        handleNewProduct,
    } = props
    return (
        <div className="item-card">
            {index % 4 === 1 ? <span className="dot"></span> : <span></span>}
            <QuantityChanger
                quantity={quantity}
                deleteListItem={deleteListItem}
                foodName={foodName}
                incrementQuantity={incrementQuantity}
            />
            <span className="foodName">{foodName}</span>
            <button
                className="removeButton"
                onClick={() => deleteListItem(foodName)}
            >
                X
            </button>
            {category.name === '' ? (
                <CategoryDropdown
                    foodName={foodName}
                    handleCategoryChange={handleCategoryChange}
                    categories={categories}
                    handleNewProduct={handleNewProduct}
                />
            ) : (
                <p
                    className="item-card-category"
                    onClick={() => handleCategoryChange(foodName, '')}
                >
                    {category.name}
                </p>
            )}
        </div>
    )
}

export default ItemCard
