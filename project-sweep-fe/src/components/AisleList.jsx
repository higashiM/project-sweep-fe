import React, { Component } from 'react'
import sortListItems from '../utils/sortListItems'
import getCategoriesArray from '../utils/getCategoriesArray'
import { Link } from '@reach/router'

class AisleList extends Component {
    state = {
        number: 12,
        products: [
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
                _id: '5eaaf6f1bc226579e0f41fdd',
                foodName: 'White Zinfandel Rose Wine',
                quantity: 1,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f80',
                    name: 'wine, prosecco & champagne',
                },
                __v: 0,
            },
            {
                _id: '5eaaf6f1bc226579e0f41fdd',
                foodName: 'White Zinfandel Rose Wine',
                quantity: 1,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f80',
                    name: 'bread',
                },
                __v: 0,
            },
            {
                _id: '5eaaf6f1bc226579e0f41fdd',
                foodName: 'White Zinfandel Rose Wine',
                quantity: 1,
                category: {
                    _id: '5eaaf6f0bc226579e0f41f80',
                    name: 'baby stuff',
                },
                __v: 0,
            },
        ],
    }

    signItems = sortListItems(this.state.products)

    render() {
        const { products } = this.state
        getCategoriesArray(this.signItems)

        return (
            <div className="aisleList">
                <section className="aisleSign">
                    <div className="aisleNumber">
                        <p>Aisle</p>
                        <p className="aisleNumberInd">{this.state.number}</p>
                    </div>

                    {this.signItems.map((category, i) => {
                        return (
                            <div
                                className={`aisleCatergory aisleCatergory${i}`}
                            >
                                {category.name}
                            </div>
                        )
                    })}
                </section>
                <main className="sorted-list">
                    {sortListItems(products).map((category, index) => {
                        return (
                            <section key={category + index}>
                                <h3>{category.name}</h3>
                                <ul>
                                    {category.items.map((item, index) => {
                                        return (
                                            <li key={item + index}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </section>
                        )
                    })}
                </main>
                <Link to="/aisleMap" className="shoppingListCompleteButton">
                    Next aisle...
                </Link>
            </div>
        )
    }
}

export default AisleList
