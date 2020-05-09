import React, { Component } from 'react'
import ItemInputForm from './ItemInputForm'
import ItemCard from './ItemCard'
import SortedList from './SortedList'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link } from '@reach/router'
import * as api from '../utils/api'
import Loader from './Loader'
import Button from '@material-ui/core/Button'

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

            this.setState({
                categories: newCats,
                isLoading: false,
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.supermarket) {
            this.props.clearPath()
        }
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
            handleNewProduct,
            clearList,
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
                                        handleNewProduct={handleNewProduct}
                                    />
                                )
                            })}
                        </ul>
                        <div className="clearButtonContainer">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={clearList}
                            >
                                Clear
                            </Button>
                            <Link to="/supermarketlist">
                                <Button variant="contained" color="primary">
                                    Go shop...
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
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
