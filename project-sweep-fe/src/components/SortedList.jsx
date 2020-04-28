import React, { Component } from 'react';
import sortListItems from '../utils/sortListItems';
const foods = require('../staticData/foods');

export class SortedList extends Component {
  state = {
    sortedItems: sortListItems(this.props.listItems),
  };
  render() {
    const { sortedItems } = this.state;
    console.log(sortedItems);
    return (
      <main className="sorted-list">
        {sortedItems.map((category, index) => {
          return (
            <section key={category + index}>
              <h3>{category.categoryName}</h3>
              <ul>
                {category.items.map((item, index) => {
                  return <li key={item + index}>{item}</li>;
                })}
              </ul>
            </section>
          );
        })}
      </main>
    );
  }
}

export default SortedList;
