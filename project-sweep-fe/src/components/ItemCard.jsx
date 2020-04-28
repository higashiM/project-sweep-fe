import React, { Component } from 'react';

export class ItemCard extends Component {
  state = {
    item: this.props.item,
  };
  render() {
    const { item } = this.state;
    return (
      <li>
        <button onClick={this.handleClick}>Remove</button>
        {item.foodName} <span className="item-category">{item.category} </span>
        <span className="item-quantity">{item.quantity}</span>
      </li>
    );
  }

  handleClick = () => {
    const { item } = this.state;
    this.props.deleteListItem(item.foodName);
  };
}

export default ItemCard;
