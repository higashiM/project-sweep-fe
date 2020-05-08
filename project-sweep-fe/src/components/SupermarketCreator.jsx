import React, { Component } from 'react'
const typeAssigner = require('../utils/typeAssigner')
import SupermarketCreator from './components/SupermarketCreator'
;<SupermarketCreator path="/createSupermarket" />
<Link to="/createSupermarket">
                    <button>Add New Supermarket</button>
                </Link>

export class SupermarketCreator extends Component {
    state = {
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
        aisleInfo: {},
    }

    render() {
        const { layout, name, location, aisleInfo } = this.state
        return (
            <div>
                <p>
                    Supermarket Aisle Layout {layout.length}x{layout[0].length}
                </p>
                <label htmlFor="increment-rows">Change Rows</label>
                <section id="increment-rows">
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
                <label htmlFor="increment-columns">Change columns</label>
                <section id="increment-columns">
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
            </div>
        )
    }
    incrementDimensions = (increment, type) => {
        const { layout } = this.state

        this.setState(
            (currentState) => {
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
            },
            () => {
                console.log(this.state.aisleInfo)
            }
        )
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
