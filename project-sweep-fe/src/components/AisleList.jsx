import React, { Component } from 'react'
import sortListItems from '../utils/sortListItems'

class AisleList extends Component {
    state = {
        number: 6,
        catergories: ['spirits & ready to drink', 'wine, prosecco & champagne'],
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
        ],
    }

    render() {
        const { catergories, products } = this.state
        return (
            <div className="notepad">
                <section className="aisleSign">
                    <div className="aisleNumber">
                        <p>Aisle</p>
                        <p>{this.state.number}</p>
                    </div>
                    {catergories.map((category, i) => {
                        return (
                            <div className={`aisleCatergory${i}`}>
                                {category}
                            </div>
                        )
                    })}
                </section>
                <main className="sorted-list">
                    {sortListItems(products).map((category, index) => {
                        return (
                            <section key={category + index}>
                                <h3>{category.categoryName.name}</h3>
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
            </div>
        )
    }
}

export default AisleList
