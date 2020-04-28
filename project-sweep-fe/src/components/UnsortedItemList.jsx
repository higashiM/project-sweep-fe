import React, { Component } from 'react';
import ItemInputForm from './ItemInputForm';

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
            <ItemInputForm updateListItems={this.updateListItems} />
          </li>{' '}
          {listItems.map((item) => {
            return (
              <li>
                {item.foodName}{' '}
                <span className="item-category">{item.category} </span>
                <span className="item-quantity">{item.quantity}</span>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  updateListItems = (newItem) => {
    this.setState((currentState) => {
      return { listItems: [...currentState.listItems, newItem] };
    });
  };
}

export default UnsortedItemList;
