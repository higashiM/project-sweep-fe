import React from 'react'

const QuantityChanger = () => {
    const { foodName, quantity } = this.props
    return (
        <section className="quantity-changer-container">
            <button
                className="increment-button down"
                onClick={() => {
                    this.props.incrementQuantity(-1, foodName)
                    if (quantity === 1) {
                        this.props.deleteListItem(foodName)
                    }
                }}
            >
                -
            </button>
            <button
                className="increment-button up"
                onClick={() => {
                    this.props.incrementQuantity(1, foodName)
                }}
            >
                +
            </button>
            <p className="quantity">{quantity}</p>
        </section>
    )
}

export default QuantityChanger
