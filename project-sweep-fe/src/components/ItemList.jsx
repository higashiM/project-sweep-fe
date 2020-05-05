import React, { Component } from 'react'
import ItemInputForm from './ItemInputForm'
import ItemCard from './ItemCard'
import SortedList from './SortedList'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link } from '@reach/router'
import * as api from '../utils/api'
import Loader from './Loader'

export class ItemList extends Component {
    state = {
        isLoading: true,
        sortedList: false,
        categories: [],
    }

    componentDidMount() {
        api.getCategories().then(({ categories }) => {
            const newCats = categories.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })

            this.setState({ categories: newCats, isLoading: false })
        })
    }

    render() {
        const { sortedList, categories, isLoading } = this.state
        const {
            listItems,
            addListItem,
            deleteListItem,
            handleCategoryChange,
            incrementQuantity,
            products,
        } = this.props
        if (isLoading) return <Loader />
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
                                        categories={categories}
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

export default ItemList
