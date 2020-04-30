import React, { Component } from 'react'
import ItemInputForm from './ItemInputForm'
import ItemCard from './ItemCard'
import SortedList from './SortedList'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link } from '@reach/router'

export class UnsortedItemList extends Component {
    state = {
        sortedList: false,
    }
    render() {
        const { sortedList } = this.state
        const {
            listItems,
            addListItem,
            deleteListItem,
            handleCategoryChange,
            incrementQuantity,
            products,
        } = this.props
        return (
            <main className="notepad">
                <h2 className="listTitle">My Shopping List</h2>
                <FormControlLabel
                    control={<Switch />}
                    label="Change View"
                    onClick={this.handleClick}
                />

                {sortedList ? (
                    <SortedList listItems={listItems} />
                ) : (
                    <div>
                        <ItemInputForm
                            addListItem={addListItem}
                            products={products}
                        />
                        <ul>
                            {listItems.map((item, index) => {
                                return (
                                    <ItemCard
                                        quantity={item.quantity}
                                        foodName={item.foodName}
                                        category={item.category}
                                        key={item + index}
                                        index={index}
                                        deleteListItem={deleteListItem}
                                        incrementQuantity={incrementQuantity}
                                        handleCategoryChange={
                                            handleCategoryChange
                                        }
                                    />
                                )
                            })}
                        </ul>
                    </div>
                )}
                <Link
                    to="/supermarketlist"
                    className="shoppingListCompleteButton"
                >
                    Go shop...
                </Link>
            </main>
        )
    }

    handleClick = () => {
        this.setState((currentState) => {
            return { sortedList: !currentState.sortedList }
        })
    }
}

export default UnsortedItemList
