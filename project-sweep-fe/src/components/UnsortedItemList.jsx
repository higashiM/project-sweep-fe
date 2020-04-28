import React, { Component } from 'react';

export class UnsortedItemList extends Component {
  state = {
    listItems: [{ name: 'cheese', category: 'dairy', quantity: 1 }],
  };
  render() {
    const { listItems } = this.state;
    return (
      <main className="unsorted-list-container">
        <h2>My list</h2>
        <p>Input form</p>
        <ul>
          {' '}
          {listItems.map((item) => {
            return (
              <li>
                {item.name}{' '}
                <span className="item-category">{item.category} </span>
                <span className="item-quantity">{item.quantity}</span>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

export default UnsortedItemList;
