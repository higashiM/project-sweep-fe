import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import ItemList from './components/ItemList'
import SupermarketList from './components/SupermarketList'
import ShopMap from './components/ShopMap'
import AisleList from './components/AisleList'
import AisleMap from './components/AisleMap'
import { Router } from '@reach/router'
import * as api from './utils/api'

class App extends Component {
    state = {
        ismaploading: true,
        supermarket: '',
        products: [],
        listItems: [
            {
                _id: '5eac3027f1a6f8b162de7d7a',
                foodName: 'mature cheddar',
                quantity: 2,
                category: {
                    _id: '5eac3027f1a6f8b162de7d1b',
                    name: 'cheese',
                },
            },
            {
                quantity: 1,
                _id: '5eac3027f1a6f8b162de7d73',
                foodName: 'strawberries',
                category: {
                    _id: '5eac3027f1a6f8b162de7d14',
                    name: 'fruit',
                },
            },
            {
                _id: '5eac3027f1a6f8b162de7d78',
                foodName: 'hot cross buns',
                quantity: 6,
                category: {
                    _id: '5eac3027f1a6f8b162de7d19',
                    name: 'bakery',
                },
                __v: 0,
            },
            {
                quantity: 8,
                _id: '5eac3027f1a6f8b162de7d9f',
                foodName: 'brooklyn lager',
                category: {
                    _id: '5eac3027f1a6f8b162de7d42',
                    name: 'beer, cider & ales',
                },
            },
            {
                _id: '5eac3027f1a6f8b162de7d8a',
                quantity: 1,
                foodName: 'jaffa cakes',
                category: {
                    _id: '5eac3027f1a6f8b162de7d2b',
                    name: 'biscuits, chocolate & sweets',
                },
            },
            {
                _id: '5eac3027f1a6f8b162de7d8a',
                quantity: 1,
                foodName: 'custard creams',
                category: {
                    _id: '5eac3027f1a6f8b162de7d24',
                    name: 'biscuits, chocolate & sweets',
                },
            },
            {
                _id: '5eac3027f1a6f8b162de7d8a',
                quantity: 1,
                foodName: 'malted milks',
                category: {
                    _id: '5eac3027f1a6f8b162de7d24',
                    name: 'biscuits, chocolate & sweets',
                },
            },
            {
                quantity: 2,
                _id: '5eac3027f1a6f8b162de7da1',
                foodName: 'yellow tail shiraz',
                category: {
                    _id: '5eac3027f1a6f8b162de7d44',
                    name: 'wine, prosecco & champagne',
                },
            },
        ],
    }

    componentDidMount() {
        api.getProducts().then((data) => {
            this.setState({ products: data })
        })
    }

    setSupermarket = (supermarket) => {
        this.setState({ supermarket, ismaploading: false })
    }

    setAisletoVisitInfo = (aislesToVisitInfo) => {
        console.log(aislesToVisitInfo)
        this.setState({ aislesToVisitInfo })
    }

    render() {
        const { listItems, products, supermarket, ismaploading } = this.state
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
                    <SupermarketList
                        setSupermarket={this.setSupermarket}
                        path="/supermarketlist"
                    />
                    <ShopMap
                        setAisletoVisitInfo={this.setAisletoVisitInfo}
                        ismaploading={ismaploading}
                        listItems={listItems}
                        supermarket={supermarket}
                        path="/shopmap"
                    />
                    <AisleList path="/aisleList" />
                    <AisleMap path="/aisleMap" />
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
