import React, { Component } from 'react'
import QuantityChanger from './QuantityChanger'
import CategoryDropdown from './CategoryDropdown'

export class ItemCard extends Component {
    render() {
        const {
            foodName,
            quantity,
            category,
            index,
            handleCategoryChange,
            categories,
        } = this.props
        return (
            <div className="item-card">
                {index % 4 === 1 ? (
                    <span className="dot"></span>
                ) : (
                    <span></span>
                )}
                <QuantityChanger
                    quantity={quantity}
                    deleteListItem={this.props.deleteListItem}
                    foodName={foodName}
                    incrementQuantity={this.props.incrementQuantity}
                />
                <span className="foodName">{foodName}</span>
                <button className="removeButton" onClick={this.handleClick}>
                    X
                </button>
                {category.name === '' ? (
                    <CategoryDropdown
                        foodName={foodName}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
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

    handleClick = () => {
        const { foodName } = this.props
        this.props.deleteListItem(foodName)
    }
}

export default ItemCard
