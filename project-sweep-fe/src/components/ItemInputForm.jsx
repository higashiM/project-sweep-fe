import React, { Component } from 'react';
import foods from '../staticData/foods';

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
    let foodMatch = foods.find((food) => {
      return food.foodName === newItem.foodName;
    });
    if (foodMatch !== undefined) {
      this.setState(
        (currentState) => {
          currentState.newItem.category = foodMatch.category;
          return { newItem: currentState.newItem };
        },
        () => {
          this.props.addListItem(newItem);
          this.setState({
            newItem: { foodName: '', quantity: 1, category: '' },
          });
          console.log(this.state.newItem);
        }
      );
    } else {
      this.props.addListItem(newItem);
      this.setState({ newItem: { foodName: '', quantity: 1, category: '' } });
    }
  };
}

export default ItemInputForm;
