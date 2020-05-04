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

const ShopMap = (props) => {
    const categoryLookup = props.supermarket.categoryLookup
    const listItems = props.listItems

    const aisleListCat = genMap.getAisleList(listItems, categoryLookup)

    const arrayAisles = aisleListCat.aisleList

    const [aisles, setAisle] = useState('')
    //const [arrayAisles, setArrayAisles] = useState([1, 7, 9, 11])

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

    const ai = props.supermarket.aisleInfo

    const layout = props.supermarket.layout

    const height = { mm: 160, mr: 160, ml: 160 }

    const pathOfAisles = genMap.genPath(arrayAisles, layout, ai)

    const handleClick = () => {
        const categories = aisleListCat.catAndFood
        const path = pathOfAisles
            .map((point) => point[2])
            .filter((point) => Number.isInteger(point))
        props.setAisletoVisitInfo({ categories, path })
    }
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
    if (props.ismaploading) return 'loading....'

    return (
        <div className="shopMap">
            <h2>Shop Map</h2>
            {createMap(layout, ai, aislePlans, aislesToVisit)}
            <Link
                to="/aisleList"
                className="shoppingListCompleteButton"
                onClick={() => handleClick()}
            >
                Get Started...
            </Link>
        </div>
    )
}

export default ShopMap
