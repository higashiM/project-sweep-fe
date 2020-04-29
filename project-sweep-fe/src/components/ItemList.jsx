import React, { Component } from 'react'
import ItemInputForm from './ItemInputForm'
import ItemCard from './ItemCard'
import SortedList from './SortedList'

export class UnsortedItemList extends Component {
    state = {
        listItems: [{ foodName: 'cheese', category: 'dairy', quantity: 1 }],
        sortedList: false,
    }
    render() {
        const { listItems, sortedList } = this.state
        return (
            <main className="list-container">
                <h2>My list</h2>
                <button onClick={this.handleClick}>
                    {sortedList ? 'View Unsorted List' : 'View Sorted List'}
                </button>
                {sortedList ? (
                    <SortedList listItems={listItems} />
                ) : (
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
                            )
                        })}
                    </ul>
                )}
            </main>
        )
    }

    handleClick = () => {
        this.setState((currentState) => {
            return { sortedList: !currentState.sortedList }
        })
    }

    addListItem = (newItem) => {
        this.setState((currentState) => {
            return { listItems: [...currentState.listItems, newItem] }
        })
    }

    deleteListItem = (itemName) => {
        console.log(this.state.listItems)
        const filteredFoodList = this.state.listItems.filter((item) => {
            return item.foodName !== itemName
        })
        this.setState({ listItems: filteredFoodList })
        console.log(filteredFoodList)
    }
}

export default UnsortedItemList
