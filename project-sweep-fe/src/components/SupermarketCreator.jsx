import React, { Component } from 'react'
import * as api from '../utils/api'
import CategoryAisleSelectCard from './CategoryAisleSelectCard'
import Button from '@material-ui/core/Button'
const typeAssigner = require('../utils/typeAssigner')

export class SupermarketCreator extends Component {
    state = {
        currentCategory: '',
        currentAisle: null,
        categories: [],
        isLoading: true,
        name: '',
        location: [],
        layout: [
            [1, 2, 3],
            [4, 5, 6],
        ],

        categoryLookup: {
            //  cheese: 1,
            //  'vegetarian & free from': 12,
            //  bakery: 2,
            //  'cat & kitten': 11,
            //  'vegetables & potatoes': 14,
            //  fruit: 13,
            //  'beer, cider & ales': 18,
            //  'biscuits, chocolate & sweets': 4,
            //  'crisps, nuts & snacks': 4,
            //  'yogurts & desserts': 6,
            //  'milk, butter, cream & eggs': 1,
            //  'fish & seafood': 7,
            //  'music, film, games & books': 15,
            //  'baby nappies': 11,
            //  'wine, prosecco & champagne': 18,
            //  'ice cream parlour': 6,
            //  'pizza, pasta & garlic bread': 13,
            //  'cereals & cereal bars': 10,
            //  'tins, packets & snack pots': 9,
            //  'cooking sauces, meal kits & sides': 6,
            //  'air fresheners & home fragrance': 17,
            //  household: 17,
            //  'meat & poultry': 7,
            //  'party food, pies, salads & dips': 3,
            //  'soft drinks, juice & water': 12,
            //  'coffee, tea & hot chocolate': 12,
            //  'world foods': 5,
        },
        aisleInfo: {
            1: { type: 'tl', x: 0, y: 0, num: 1 },
            2: { type: 'tm', x: 1, y: 0, num: 2 },
            3: { type: 'tr', x: 2, y: 0, num: 3 },
            4: { type: 'cl', x: 3, y: 0, num: 4 },
            5: { type: 'cm', x: 4, y: 0, num: 5 },
            6: { type: 'cr', x: 5, y: 0, num: 6 },
        },
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
        const {
            layout,
            name,

            aisleInfo,
            categories,
            currentAisle,
            currentCategory,
            categoryLookup,
        } = this.state
        let categoryLookupArr = Object.entries(categoryLookup)
        return (
            <main className="supermarketCreatorContainer">
                <form clasName="newSupermarket-form">
                    <label htmlFor="">
                        Supermarket Name:
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={name}
                            required
                        ></input>
                    </label>
                    <p>
                        Supermarket Aisle Layout {layout.length}x
                        {layout[0].length}
                    </p>
                    <section className="layout-change-container">
                        <label htmlFor="increment-rows">
                            Change Rows
                            <section id="increment-layout">
                                <button
                                    disabled={layout.length === 2}
                                    onClick={() => {
                                        this.incrementDimensions(-1, 'row')
                                    }}
                                    className="increment-button down"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => {
                                        this.incrementDimensions(1, 'row')
                                    }}
                                    className="increment-button up"
                                >
                                    +
                                </button>
                            </section>
                        </label>

                        <label htmlFor="increment-columns">
                            Change columns
                            <section className="increment-layout">
                                <button
                                    disabled={layout[0].length === 3}
                                    onClick={() => {
                                        this.incrementDimensions(-1, 'column')
                                    }}
                                    className="increment-button down"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => {
                                        this.incrementDimensions(1, 'column')
                                    }}
                                    className="increment-button up"
                                >
                                    +
                                </button>
                            </section>
                        </label>
                    </section>
                    <section className="category-lookup-input-container">
                        <h4>Assign Categories To Aisles</h4>
                        <CategoryAisleSelectCard
                            categories={categories}
                            updateCurrent={this.updateCurrent}
                            currentCategory={this.state.currentCategory}
                        />
                        <CategoryAisleSelectCard
                            className="aisle-category-dropdown"
                            aisles={Object.keys(aisleInfo)}
                            updateCurrent={this.updateCurrent}
                            currentCategory={this.state.currentAisle}
                        />
                        <Button
                            className="add-to-lookup-button"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                this.updateCategoryLookup(
                                    currentAisle,
                                    currentCategory
                                )
                            }
                        >
                            Add
                        </Button>
                    </section>
                    <ul className="category/aisle-assignment-list">
                        {categoryLookupArr.map((entry) => {
                            return (
                                <li>
                                    <strong>Aisle</strong> {entry[1]},{' '}
                                    <strong>Category:</strong> {entry[0]}
                                </li>
                            )
                        })}
                    </ul>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </form>
            </main>
        )
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { name, aisleInfo, categoryLookup, layout } = this.state
        api.postSupermarkets(name, aisleInfo, categoryLookup, layout).then(
            () => {
                this.setState({
                    name: '',
                    categoryLookup: {},
                    aisleInfo: {
                        1: { type: 'tl', x: 0, y: 0, num: 1 },
                        2: { type: 'tm', x: 1, y: 0, num: 2 },
                        3: { type: 'tr', x: 2, y: 0, num: 3 },
                        4: { type: 'cl', x: 3, y: 0, num: 4 },
                        5: { type: 'cm', x: 4, y: 0, num: 5 },
                        6: { type: 'cr', x: 5, y: 0, num: 6 },
                    },
                    layout: [
                        [1, 2, 3],
                        [4, 5, 6],
                    ],
                })
            }
        )
    }
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({ name: event.target.value })
    }

    updateCategoryLookup = (aisle, category) => {
        this.setState(
            (currentState) => {
                currentState.categoryLookup[category] = aisle
                return {
                    categoryLookup: { ...currentState.categoryLookup },
                }
            },
            () => {
                this.setState({ currentAisle: '', currentCategory: '' })
                console.log(this.state.categoryLookup)
            }
        )
    }
    updateCurrent = (type, value) => {
        type === 'category'
            ? this.setState({ currentCategory: value })
            : this.setState({ currentAisle: value })
    }

    incrementDimensions = (increment, type) => {
        const { layout } = this.state

        this.setState((currentState) => {
            let newColumns
            let newRows
            if (type === 'row') {
                newColumns = currentState.layout[0].length
                newRows = currentState.layout.length + increment
            } else {
                newColumns = currentState.layout[0].length + increment
                newRows = currentState.layout.length
            }

            let newLayout = []
            let newAisleinfo = {}
            let count = 1
            for (let currentRow = 0; currentRow < newRows; currentRow++) {
                let row = []
                for (
                    let currentColumn = 0;
                    currentColumn < newColumns;
                    currentColumn++
                ) {
                    if (currentColumn === 0) {
                        newAisleinfo[count] = {
                            type: `${typeAssigner(currentRow, newRows)}l`,
                            x: currentColumn,
                            y: currentRow,
                            num: count,
                        }
                    }
                    if (currentColumn === newColumns - 1) {
                        newAisleinfo[count] = {
                            type: `${typeAssigner(currentRow, newRows)}r`,
                            x: currentColumn,
                            y: currentRow,
                            num: count,
                        }
                    }
                    if (
                        currentColumn !== newColumns - 1 &&
                        currentColumn !== 0
                    ) {
                        newAisleinfo[count] = {
                            type: `${typeAssigner(currentRow, newRows)}m`,
                            x: currentColumn,
                            y: currentRow,
                            num: count,
                        }
                    }
                    row.push(count)
                    count++
                }
                newLayout.push(row)
            }
            return { layout: newLayout, aisleInfo: newAisleinfo }
        })
    }
}
//type - refers the svg tile eg 0,0 is always top left
//     layout = top row = tl tm tr
//                         ml
//    1: { type: 'tl', x: 0, y: 0, num: 1 },
// 2: { type: 'tm', x: 1, y: 0, num: 2 },
// 3: { type: 'tm', x: 2, y: 0, num: 3 },
// 4: { type: 'tm', x: 3, y: 0, num: 4 },
// 5: { type: 'tm', x: 4, y: 0, num: 5 },
// 6: { type: 'tr', x: 5, y: 0, num: 6 },
// 7: { type: 'ml', x: 0, y: 1, num: 7 },
// 8: { type: 'mm', x: 1, y: 1, num: 8 },
// 9: { type: 'mm', x: 2, y: 1, num: 9 },
// 10: { type: 'mm', x: 3, y: 1, num: 10 },
// 11: { type: 'mm', x: 4, y: 1, num: 11 },
// 12: { type: 'mr', x: 5, y: 1, num: 12 },
// 13: { type: 'cl', x: 0, y: 2, num: 13 },
// 14: { type: 'cm', x: 1, y: 2, num: 14 },
// 15: { type: 'cm', x: 2, y: 2, num: 15 },
// 16: { type: 'cm', x: 3, y: 2, num: 16 },
// 17: { type: 'cm', x: 4, y: 2, num: 17 },
// 18: { type: 'cr', x: 5, y: 2, num: 18 },
// },

export default SupermarketCreator
