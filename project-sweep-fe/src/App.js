import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import ItemList from './components/ItemList'
import { Router } from '@reach/router'
import ShopMap from './components/ShopMap'
import SupermarketList from './components/SupermarketList'
import * as api from './utils/api'

class App extends Component {
    state = {
        products: [
            {
                _id: '5eaac3727bb97500175a8693',
                name: 'strawberries',
                foodName: 'strawberries',
                quantity: 1,
                category: {
                    _id: '5eaac3727bb97500175a8634',
                    name: 'fruit',
                },
                __v: 0,
            },
        ],
        listItems: [
            {
                _id: '5eaaf6f1bc226579e0f41fdc',
                foodName: 'laphroig',
                quantity: 7,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f7f',
                    name: 'spirits & ready to drink',
                },
                __v: 0,
            },
            {
                _id: '5eaaf6f1bc226579e0f41fdd',
                foodName: 'yellow tail shiraz',
                quantity: 1,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f80',
                    name: 'wine, prosecco & champagne',
                },
                __v: 0,
            },
            {
                _id: '5eaaf6f1bc226579e0f41fde',
                foodName: 'ovaltine',
                quantity: 4,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f81',
                    name: 'coffee, tea & hot chocolate',
                },
                __v: 0,
            },
            {
                _id: '5eaaf6f1bc226579e0f41fc0',
                foodName: 'basmati rice',
                quantity: 4,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f61',
                    name: 'rice, pasta & noodles',
                },
                __v: 0,
            },

            {
                _id: '5eaaf6f1bc226579e0f41fd4',
                foodName: 'chicken samosas',
                quantity: 8,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f75',
                    name: 'frozen world foods',
                },
                __v: 0,
            },
        ],
    }

    componentDidMount() {
        api.getProducts().then((data) => {
            this.setState({ products: data })
        })
    }

    render() {
        const { listItems, products } = this.state
        return (
            <div className="App">
                <Header />
                <Router>
                    <ItemList
                        path="/"
                        listItems={listItems}
                        addListItem={this.addListItem}
                        deleteListItem={this.deleteListItem}
                        handleCategoryChange={this.handleCategoryChange}
                        incrementQuantity={this.incrementQuantity}
                        products={products}
                    />
                    <SupermarketList path="/supermarketlist" />
                    <ShopMap listItems={listItems} path="/shopmap" />
                </Router>
            </div>
        )
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
                        category: { ...item.category, name: newCat },
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

export default App
