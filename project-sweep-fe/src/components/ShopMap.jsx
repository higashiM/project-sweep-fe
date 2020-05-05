import React, { useState } from 'react'
import { Link } from '@reach/router'
import * as genMap from '../utils/genMap'
import Loader from '../components/Loader'
import Tooltip from '@material-ui/core/Tooltip'
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

    const aislesToVisit = genMap.assignSVGtoPath(pathOfAisles)

    const createMap = (layout, aisleInfo, aislePlans, aislesToVisit) => {
        return (
            <>
                {layout.map((row, index) => {
                    //console.log(aislesToVisit, aislePlans, aisleInfo)
                    const y = index
                    return (
                        <>
                            {row.map((number, index) => {
                                const aisle = aisleInfo[number]
                                const xy =
                                    'xy' + index.toString() + y.toString()
                                return (
                                    <svg
                                        x={`${index * 80}`}
                                        y={`${
                                            y * 200 +
                                            -40 * (y === layout.length - 1)
                                        }`}
                                        id={xy}
                                        width="80px"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <>
                                            {aislesToVisit[xy]
                                                ? aislesToVisit[xy].path
                                                : null}
                                            {aislesToVisit[xy] ? (
                                                aislesToVisit[xy].waypoint ? (
                                                    <Tooltip
                                                        id="category_tooltip"
                                                        title={
                                                            aisleListCat
                                                                .catAndFood[
                                                                aisle.num
                                                            ]
                                                        }
                                                        leaveDelay="500"
                                                    >
                                                        {drawWayPoint(
                                                            height[
                                                                aisle.type
                                                            ] || 200
                                                        )}
                                                    </Tooltip>
                                                ) : null
                                            ) : null}
                                            {showAisle(
                                                aisle.num,
                                                height[aisle.type] || 200
                                            )}
                                        </>
                                    </svg>
                                )
                            })}
                        </>
                    )
                })}
                {layout.flat().map((aisle) => {
                    switch (aisleInfo[aisle].type) {
                        case 'tl':
                            return <TopLeft x="0" y="0" />
                        case 'tm':
                            return (
                                <TopMiddle x={aisleInfo[aisle].x * 80} y="0" />
                            )
                        case 'tr':
                            return (
                                <TopRight x={aisleInfo[aisle].x * 80} y="0" />
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
            </>
        )
    }

    const handleClick = () => {
        const pathMaps = {}

        const pathOfWayPoints = pathOfAisles.filter((point) =>
            Number.isInteger(point[2])
        )

        pathOfWayPoints.forEach((path, index) => {
            const xStart = path[0]
            const yStart = path[1]
            let width = layout[0].length
            let height = layout.length
            if (pathOfWayPoints[index + 1]) {
                width = pathOfWayPoints[index + 1][0] - path[0]
                height = pathOfWayPoints[index + 1][1] - path[1]
                console.log(pathOfWayPoints, path)
            }
            pathMaps[path[2]] = pathMapSVG(xStart, yStart, width, height)
        })
        const categories = aisleListCat.catAndFood
        const path = pathOfWayPoints
            .map((point) => point[2])
            .filter((point) => Number.isInteger(point))
        props.setAisletoVisitInfo({ categories, path, pathMaps })
        console.log(categories, path, pathMaps)
    }
    const pathMapSVG = (xStart, yStart, width, height) => {
        return (
            <svg
                className="shopMapSVG"
                width={layout[0].length * 80}
                height={200 + (layout.length - 2) * 160 + 200}
                viewBox={`${xStart * 80} ${yStart * 80} ${Math.min(
                    layout[0].length * 80,
                    width * 80 + 80
                )} ${Math.min(
                    200 + (layout.length - 2) * 160 + 200,
                    height * 200 + 200
                )}`}
            >
                {createMap(layout, ai, aislePlans, aislesToVisit)}
            </svg>
        )
    }

    if (props.ismaploading) return <Loader />

    return (
        <div className="shopMap">
            <h2>Shop Map</h2>
            {pathMapSVG(0, 0, 5, 2)}

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
