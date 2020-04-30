import React, { Component } from 'react'
import ItemInputForm from './ItemInputForm'
import ItemCard from './ItemCard'
import SortedList from './SortedList'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export class UnsortedItemList extends Component {
    state = {
        listItems: [
            { foodName: 'Yoghurt', category: 'Dairy', quantity: 9 },
            { foodName: 'Beef burger', category: 'Meat', quantity: 5 },
            { foodName: 'Chocolate', category: 'Confectionary', quantity: 17 },
        ],
        sortedList: false,
    }
    render() {
        const { listItems, sortedList } = this.state
        return (
            <main className="notepad">
                <h2 className="listTitle">My Shopping List</h2>
                <FormControlLabel
                    control={<Switch />}
                    label={sortedList ? 'Change View' : 'Change View'}
                    onClick={this.handleClick}
                />

                {sortedList ? (
                    <SortedList listItems={listItems} />
                ) : (
                    <div>
                        <ItemInputForm addListItem={this.addListItem} />
                        <ul>
                            {listItems.map((item, index) => {
                                return (
                                    <ItemCard
                                        quantity={item.quantity}
                                        foodName={item.foodName}
                                        category={item.category}
                                        key={item + index}
                                        index={index}
                                        deleteListItem={this.deleteListItem}
                                        incrementQuantity={
                                            this.incrementQuantity
                                        }
                                        handleCategoryChange={
                                            this.handleCategoryChange
                                        }
                                    />
                                )
                            })}
                        </ul>
                    </div>
                )}
                <button className="shoppingListCompleteButton">
                    Go shop...
                </button>
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
            return { listItems: [newItem, ...currentState.listItems] }
        })
    }

    deleteListItem = (itemName) => {
        this.setState((currentState) => {
            const filteredFoodList = currentState.listItems.filter((item) => {
                return item.foodName !== itemName
            })

            return { listItems: filteredFoodList }
        })
    }

    handleCategoryChange = (foodname, newCat) => {
        this.setState((currentState) => {
            const newList = currentState.listItems.map((item) => {
                if (item.foodName === foodname) {
                    return {
                        ...item,
                        category: newCat,
                    }
                } else {
                    return item
                }
            })
            return { listItems: newList }
        })
    }

    incrementQuantity = (number, foodname) => {
        this.setState((currentState) => {
            const newList = currentState.listItems.map((item) => {
                if (item.foodName === foodname) {
                    const quantity = item.quantity + number
                    return {
                        foodName: item.foodName,
                        category: item.category,
                        quantity,
                    }
                } else {
                    return item
                }
            })
            return { listItems: newList }
        })
    }
}

export default UnsortedItemList
