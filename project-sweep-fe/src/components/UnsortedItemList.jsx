import React, { Component } from 'react';
import ItemInputForm from './ItemInputForm';
import ItemCard from './ItemCard';

export class UnsortedItemList extends Component {
  state = {
    listItems: [{ foodName: 'cheese', category: 'dairy', quantity: 1 }],
  };
  render() {
    const { listItems } = this.state;
    return (
      <main className="unsorted-list-container">
        <h2>My list</h2>

        <ul>
          <li>
            <ItemInputForm addListItem={this.addListItem} />
          </li>{' '}
          {listItems.map((item, index) => {
            return (
              <ItemCard
                item={item}
                key={item + index}
                deleteListItem={this.deleteListItem}
              />
            );
          })}
        </ul>
      </main>
    );
  }
  addListItem = (newItem) => {
    this.setState((currentState) => {
      return { listItems: [...currentState.listItems, newItem] };
    });
  };

  deleteListItem = (itemName) => {
    console.log(this.state.listItems);
    const filteredFoodList = this.state.listItems.filter((item) => {
      return item.foodName !== itemName;
    });
    this.setState({ listItems: filteredFoodList });
    console.log(filteredFoodList);
  };
}

export default UnsortedItemList;
