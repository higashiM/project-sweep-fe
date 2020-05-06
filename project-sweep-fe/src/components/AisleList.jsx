import React, { Component } from 'react'
import sortListItems from '../utils/sortListItems'
import getCategoriesArray from '../utils/getCategoriesArray'
import { Link } from '@reach/router'
import Loader from './Loader'
import Checkbox from '@material-ui/core/Checkbox'

class AisleList extends Component {
    state = {
        checkedItems: [],
        isLoading: true,
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
        console.log(listItems)

        this.setState({
            isLoading: false,
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
        const { products, checkedItems } = this.state
        const {
            increaseAisleCount,
            aisleCount,
            number,
            aisleOrder,
            isLoading,
            removeListItems,
        } = this.props
        const signItems = sortListItems(this.state.products)
        getCategoriesArray(signItems)
        console.log(this.state.products)
        if (isLoading) return <Loader />
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
                                key={category + i}
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
                                <div>
                                    {category.items.map((item, index) => {
                                        return (
                                            <div
                                                className="aisleListItem"
                                                key={item + index}
                                            >
                                                <li>{`${item[0]} ${item[1]}`}</li>
                                                <Checkbox
                                                    onClick={() =>
                                                        this.handleCheckBox(
                                                            item[1]
                                                        )
                                                    }
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })}
                </main>
                <Link
                    to={
                        aisleCount === aisleOrder.length - 1
                            ? '/summaryPage'
                            : '/aisleMap'
                    }
                    className="shoppingListCompleteButton"
                    onClick={() => {
                        increaseAisleCount()
                        removeListItems(checkedItems)
                    }}
                >
                    Next aisle...
                </Link>
            </div>
        )
    }
    handleCheckBox = (item) => {
        this.setState((currState) => {
            if (currState.checkedItems.indexOf(item) === -1) {
                return { checkedItems: [...currState.checkedItems, item] }
            } else {
                return {
                    checkedItems: currState.checkedItems.filter((curItem) => {
                        return curItem !== item
                    }),
                }
            }
        })
    }
}

export default AisleList
