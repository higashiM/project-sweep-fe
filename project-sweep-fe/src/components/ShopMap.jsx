import React, { useState } from 'react'
import { Link } from '@reach/router'
import * as genMap from '../utils/genMap'
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
} from '../resources/maplayout/index'
import { drawWayPoint, showAisle } from '../resources/maplayout/paths'
//when state updates
/* const handleClick = () => {
    const input = aisles.split(',')
    setArrayAisles(input)
} */

const ShopMap = () => {
    const [aisles, setAisle] = useState('')
    const [arrayAisles, setArrayAisles] = useState([1, 7, 9, 11])

    const [aislePlans, setAislePlans] = useState({
        tl: <TopLeft />,
        tm: <TopMiddle />,
        tr: <TopRight />,
        ml: <MiddleLeft />,
        mm: <MiddleMiddle />,
        mr: <MiddleRight />,
        cl: <CheckoutLeft />,
        cm: <CheckoutMiddle />,
        cr: <CheckoutRight />,
    })

    const ai = {
        1: { type: 'tl', x: 0, y: 0, num: 1 },
        2: { type: 'tm', x: 1, y: 0, num: 2 },
        3: { type: 'tm', x: 2, y: 0, num: 3 },
        4: { type: 'tm', x: 3, y: 0, num: 4 },
        5: { type: 'tm', x: 4, y: 0, num: 5 },
        6: { type: 'tr', x: 5, y: 0, num: 6 },
        7: { type: 'ml', x: 0, y: 1, num: 7 },
        8: { type: 'mm', x: 1, y: 1, num: 8 },
        9: { type: 'mm', x: 2, y: 1, num: 9 },
        10: { type: 'mm', x: 3, y: 1, num: 10 },
        11: { type: 'mm', x: 4, y: 1, num: 11 },
        12: { type: 'mr', x: 5, y: 1, num: 12 },
        13: { type: 'cl', x: 0, y: 2, num: 13 },
        14: { type: 'cm', x: 1, y: 2, num: 14 },
        15: { type: 'cm', x: 2, y: 2, num: 15 },
        16: { type: 'cm', x: 3, y: 2, num: 16 },
        17: { type: 'cm', x: 4, y: 2, num: 17 },
        18: { type: 'cr', x: 5, y: 2, num: 18 },
    }

    const layout = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
    ]

    const height = { mm: 160, mr: 160, ml: 160 }

    const pathOfAisles = genMap.genPath(arrayAisles, layout, ai)

    const aislesToVisit = genMap.assignSVGtoPath(pathOfAisles)

    const createMap = (layout, ai, aislePlans, aislesToVisit) => {
        return (
            <>
                {layout.map((row, index) => {
                    const y = index
                    return (
                        <div>
                            {row.map((number, index) => {
                                const aisle = ai[number]
                                const xy =
                                    'xy' + index.toString() + y.toString()
                                return (
                                    <svg
                                        width="80px"
                                        viewBox={`0 0 80 ${
                                            height[aisle.type] || 200
                                        }`}
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <g>
                                            {aislePlans[aisle.type]}{' '}
                                            {aislesToVisit[xy]
                                                ? aislesToVisit[xy].path
                                                : null}
                                            {aislesToVisit[xy]
                                                ? aislesToVisit[xy].waypoint
                                                    ? drawWayPoint(
                                                          height[aisle.type] ||
                                                              200
                                                      )
                                                    : null
                                                : null}
                                            {showAisle(
                                                aisle.num,
                                                height[aisle.type] || 200
                                            )}
                                        </g>
                                    </svg>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div className="shopMap">
            <h2>Shop Map</h2>
            {createMap(layout, ai, aislePlans, aislesToVisit)}
            <Link to="/aisleList" className="shoppingListCompleteButton">
                Get Started...
            </Link>
        </div>
    )
}

export default ShopMap
