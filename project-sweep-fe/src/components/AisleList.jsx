import React, { Component } from 'react'
import sortListItems from '../utils/sortListItems'
import getCategoriesArray from '../utils/getCategoriesArray'
import { Link } from '@reach/router'
import { paths } from '../resources/maplayout/paths'

class AisleList extends Component {
    state = {
        number: 12,
        products: [
            {
                _id: '5eac3027f1a6f8b162de7d7a',
                foodName: 'mature cheddar',
                quantity: 2,
                category: {
                    _id: '5eac3027f1a6f8b162de7d1b',
                    name: 'cheese',
                },
            },
        ],
    }

    componentDidMount() {
        const { listItems, categories, aisleOrder, aisleCount } = this.props
        this.setState({
            products: listItems.filter((item) => {
                return (
                    categories[aisleOrder[aisleCount]].indexOf(
                        item.category.name
                    ) >= 0
                )
            }),
        })
    }

    render() {
        const { products } = this.state
        const {
            increaseAisleCount,
            aisleCount,
            number,
            aisleOrder,
        } = this.props
        const signItems = sortListItems(this.state.products)
        getCategoriesArray(signItems)

        return (
            <div className="aisleList">
                <section className="aisleSign">
                    <div className="aisleNumber">
                        <p>Aisle</p>
                        <p className="aisleNumberInd">{number}</p>
                    </div>

                    {signItems.map((category, i) => {
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
                <Link
                    to={
                        aisleCount === aisleOrder.length - 1 ? '/' : '/aisleMap'
                    }
                    className="shoppingListCompleteButton"
                    onClick={increaseAisleCount}
                >
                    Next aisle...
                </Link>
            </div>
        )
    }
}

export default AisleList
