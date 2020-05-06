import React from 'react'

const QuantityChanger = (props) => {
    const { foodName, quantity } = props
    return (
        <section className="quantity-changer-container">
            <button
                className="increment-button down"
                onClick={() => {
                    props.incrementQuantity(-1, foodName)
                    if (quantity === 1) {
                        props.deleteListItem(foodName)
                    }
                }}
            >
                -
            </button>
            <button
                className="increment-button up"
                onClick={() => {
                    props.incrementQuantity(1, foodName)
                }}
            >
                +
            </button>
            <p className="quantity">{quantity}</p>
        </section>
    )
}

export default QuantityChanger
