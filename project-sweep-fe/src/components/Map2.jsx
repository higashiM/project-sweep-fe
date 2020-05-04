import React from 'react'
import {
    TopLeft,
    TopMiddle,
    TopRight,
    MiddleLeft,
    MiddleMiddle,
    MiddleRight,
    CheckoutLeft,
    CheckoutMiddle,
    CheckoutRight,
} from './resources/index'
import { pathPlotter } from '../utils/pathPlotter'

class Map extends React.Component {
    state = {
        aislePath: [
            [0, 3, 'start'],
            [0, 2, 13],
            [0, 1, ''],
            [0, 0, 1],
            [1, 0, 2],
            [2, 0, ''],
            [3, 0, 4],
            [4, 0, ''],
            [5, 0, ''],
            [5, 1, ''],
            [5, 2, 18],
            [5, 3, 'finish'],
        ],
        aislePath2: [
            [0, 3, 'start'],
            [0, 2, ''],
            [0, 1, 7],
            [0, 0, 1],
            [1, 0, 2],
            [2, 0, ''],
            [3, 0, ''],
            [4, 0, 5],
            [4, -1, 'finish'],
        ],
        supermarket: {
            layout: [
                [1, 2, 3, 4, 5, 19, 6],
                [7, 8, 9, 10, 11, 20, 12],
                [13, 14, 15, 16, 17, 21, 18],
            ],
            _id: '5eac0207ede3599c04d0a50d',
            name: 'supermarket1',
            categoryLookup: {
                cheese: 1,
                'vegetarian & free from': 12,
                bakery: 2,
                'cat & kitten': 11,
                'vegetables & potatoes': 14,
                fruit: 13,
                'beer, cider & ales': 18,
                'biscuits, chocolate & sweets': 4,
                'crisps, nuts & snacks': 4,
                'yogurts & desserts': 6,
                'milk, butter, cream & eggs': 1,
                'fish & seafood': 7,
                'music, film, games & books': 15,
                'baby nappies': 11,
                'wine, prosecco & champagne': 18,
                'ice cream parlour': 6,
                'pizza, pasta & garlic bread': 13,
                'cereals & cereal bars': 10,
                'tins, packets & snack pots': 9,
                'cooking sauces, meal kits & sides': 6,
                'air fresheners & home fragrance': 17,
                household: 17,
                'meat & poultry': 7,
                'party food, pies, salads & dips': 3,
                'soft drinks, juice & water': 12,
                'coffee, tea & hot chocolate': 12,
                'world foods': 5,
            },
            aisleInfo: {
                1: {
                    type: 'tl',
                    x: 0,
                    y: 0,
                    num: 1,
                },
                2: {
                    type: 'tm',
                    x: 1,
                    y: 0,
                    num: 2,
                },
                3: {
                    type: 'tm',
                    x: 2,
                    y: 0,
                    num: 3,
                },
                4: {
                    type: 'tm',
                    x: 3,
                    y: 0,
                    num: 4,
                },
                5: {
                    type: 'tm',
                    x: 4,
                    y: 0,
                    num: 5,
                },
                6: {
                    type: 'tr',
                    x: 6,
                    y: 0,
                    num: 6,
                },
                7: {
                    type: 'ml',
                    x: 0,
                    y: 1,
                    num: 7,
                },
                8: {
                    type: 'mm',
                    x: 1,
                    y: 1,
                    num: 8,
                },
                9: {
                    type: 'mm',
                    x: 2,
                    y: 1,
                    num: 9,
                },
                10: {
                    type: 'mm',
                    x: 3,
                    y: 1,
                    num: 10,
                },
                11: {
                    type: 'mm',
                    x: 4,
                    y: 1,
                    num: 11,
                },
                12: {
                    type: 'mr',
                    x: 6,
                    y: 1,
                    num: 12,
                },
                13: {
                    type: 'cl',
                    x: 0,
                    y: 2,
                    num: 13,
                },
                14: {
                    type: 'cm',
                    x: 1,
                    y: 2,
                    num: 14,
                },
                15: {
                    type: 'cm',
                    x: 2,
                    y: 2,
                    num: 15,
                },
                16: {
                    type: 'cm',
                    x: 3,
                    y: 2,
                    num: 16,
                },
                17: {
                    type: 'cm',
                    x: 4,
                    y: 2,
                    num: 17,
                },
                18: {
                    type: 'cr',
                    x: 6,
                    y: 2,
                    num: 18,
                },
                19: {
                    type: 'tm',
                    x: 5,
                    y: 0,
                    num: 6,
                },
                20: {
                    type: 'mm',
                    x: 5,
                    y: 1,
                    num: 18,
                },
                21: {
                    type: 'cm',
                    x: 5,
                    y: 2,
                    num: 18,
                },
            },
            __v: 0,
        },
    }

    render() {
        const {
            supermarket: { layout, aisleInfo },
            aislePath,
        } = this.state

        return (
            <>
                <svg
                    viewBox={`0 0 ${layout[0].length * 80} ${
                        200 + (layout.length - 2) * 160 + 200
                    }`}
                >
                    {layout.flat().map((aisle) => {
                        switch (aisleInfo[aisle].type) {
                            case 'tl':
                                return <TopLeft x="0" y="0" />
                            case 'tm':
                                return (
                                    <TopMiddle
                                        x={aisleInfo[aisle].x * 80}
                                        y="0"
                                    />
                                )
                            case 'tr':
                                return (
                                    <TopRight
                                        x={aisleInfo[aisle].x * 80}
                                        y="0"
                                    />
                                )
                            case 'ml':
                                return (
                                    <MiddleLeft
                                        x="0"
                                        y={200 + (aisleInfo[aisle].y - 1) * 160}
                                    />
                                )
                            case 'mm':
                                return (
                                    <MiddleMiddle
                                        x={aisleInfo[aisle].x * 80}
                                        y={200 + (aisleInfo[aisle].y - 1) * 160}
                                    />
                                )
                            case 'mr':
                                return (
                                    <MiddleRight
                                        x={aisleInfo[aisle].x * 80}
                                        y={200 + (aisleInfo[aisle].y - 1) * 160}
                                    />
                                )
                            case 'cl':
                                return (
                                    <CheckoutLeft
                                        x="0"
                                        y={200 + (aisleInfo[aisle].y - 1) * 160}
                                    />
                                )
                            case 'cm':
                                return (
                                    <CheckoutMiddle
                                        x={aisleInfo[aisle].x * 80}
                                        y={200 + (aisleInfo[aisle].y - 1) * 160}
                                    />
                                )
                            case 'cr':
                                return (
                                    <CheckoutRight
                                        x={aisleInfo[aisle].x * 80}
                                        y={200 + (aisleInfo[aisle].y - 1) * 160}
                                    />
                                )
                            default:
                                return null
                        }
                    })}
                    >
                    <path
                        id="supermarketpath"
                        d={`M 45 ${200 + (layout.length - 2) * 160 + 165} ${
                            pathPlotter(aislePath)[0]
                        }`}
                        stroke="red"
                        strokeWidth="10"
                        fill="none"
                        strokeDashoffset={`${pathPlotter(aislePath)[1]}`}
                        strokeDasharray={`${pathPlotter(aislePath)[1]} ${
                            pathPlotter(aislePath)[1]
                        }`}
                        strokeLinecap="round"
                    />
                </svg>
            </>
        )
    }
}

export default Map
