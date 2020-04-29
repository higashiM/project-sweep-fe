import React, { Component } from 'react'
import QuantityChanger from './QuantityChanger'

export class ItemCard extends Component {
    render() {
        const { item } = this.props
        return (
            <li className="item-card">
                <button onClick={this.handleClick}>Remove</button>
                <span className="food-name">{item.foodName} /</span>{' '}
                <span className="item-category">{item.category} </span>
                <QuantityChanger
                    quantity={this.props.item.quantity}
                    deleteListItem={this.props.deleteListItem}
                    foodName={item.foodName}
                />
            </li>
        )
    }

    handleClick = () => {
        const { item } = this.props
        this.props.deleteListItem(item.foodName)
    }
}

export default ItemCard
