import React, { Component } from 'react';

export class ItemInputForm extends Component {
  state = {
    newItem: { foodName: '', quantity: 1, category: '' },
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="add-item-input">Add Item</label>
        <input
          id="add-item-input"
          type="text"
          name="foodName"
          value={this.state.newItem.foodName}
          onChange={this.handleChange}
        />
        <input
          id="item-quantity-input"
          type="number"
          name="quantity"
          step="1"
          value={this.state.newItem.quantity}
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((currentState) => {
      currentState.newItem[name] = value;
      return { newItem: currentState.newItem };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { newItem } = this.state;
    this.props.updateListItems(newItem);
    this.setState({ newItem: { foodName: '', quantity: 1, category: '' } });
  };
}

export default ItemInputForm;
