import React, { useState } from 'react'
import { Link } from '@reach/router'

//when state updates
/* const handleClick = () => {
    const input = aisles.split(',')
    setArrayAisles(input)
} */
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

import { paths, drawWayPoint, showAisle } from '../resources/maplayout/paths'
import { topPaths } from '../resources/maplayout/topPaths'

const ShopMap = () => {
    const [aisles, setAisle] = useState('')
    const [arrayAisles, setArrayAisles] = useState([1, 3, 8, 15, 4])

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

    const genPath = (
        aislesToVisit,
        start = [0, layout.length, 'start'],
        maxRow = layout.length,
        maxColumn = layout[0].length
    ) => {
        const columnsToTraverse = {} //lookup object for colums containg aisles to visit
        const aisleTickOff = {} //object to count off which aisles have been visited

        aislesToVisit.forEach((aisle) => {
            const x = ai[aisle].x
            const y = ai[aisle].y
            if (!columnsToTraverse[x]) columnsToTraverse[x] = {}
            columnsToTraverse[x] = 'visit'
            const ref = 'xy'.concat(x, y)
            aisleTickOff[ref] = aisle
        })

        const aislePath = [start]

        const addVertical = (x, y) => {
            const ref = 'xy'.concat(x, y)

            if (aisleTickOff[ref]) {
                aislePath.push([x, y, 'waypoint'])
                delete aisleTickOff[ref]
            } else aislePath.push([x, y, ''])
        }

        const addHorizontal = (x, goingUp, y) => {
            if (goingUp) aislePath.push([x, maxRow - 1, ''])
            if (!goingUp) aislePath.push([x, 0, ''])
        }

        const addFinish = (checkout, x, y) => {
            if (checkout) {
                aislePath.push([x, maxRow, 'finish'])
            } else aislePath.push([x, y - 1, 'finish'])
        }
        //variable to record vertical direction
        let goingUp = true

        //cycles through map from bottom left to rop right starting at (x = 0, maxRow)
        //if column has an aisle to visit it traverses in alternative directions otherwise moves horizontally

        for (let x = 0; x < maxColumn; x++) {
            if (columnsToTraverse[x]) {
                if (goingUp) {
                    for (let y = maxRow - 1; y >= 0; y--) {
                        addVertical(x, y)
                        if (Object.keys(aisleTickOff).length === 0) {
                            addFinish(false, x, y)
                            return aislePath
                        }
                    }
                    goingUp = false
                } else {
                    for (let y = 0; y < maxRow; y++) {
                        addVertical(x, y)
                        goingUp = true
                    }
                }
            } else {
                addHorizontal(x, goingUp)
            }
            if (Object.keys(aisleTickOff).length === 0) {
                if (goingUp) {
                    addFinish(true, x)
                }
                return aislePath
            }
        }

        return aislePath
    }

    const assignSVGtoPath = (aislePath, maxRow = layout.length - 1) => {
        console.log(aislePath)
        //object look up constructed for rendering
        const aislestoVisit = {}

        for (let index = 1; index < aislePath.length - 1; index++) {
            const curr = aislePath[index]
            const prev = aislePath[index - 1]
            const next = aislePath[index + 1]

            const prevX = prev[0]
            const prevY = prev[1]
            const currX = curr[0]
            const currY = curr[1]
            const nextX = next[0]
            const nextY = next[1]
            const prevPos = prev[2]
            const nextPos = next[2]
            const pathLookup = [
                ['TopL', 'TopM', 'TopR'],
                ['TopL', 'Mid', 'TopR'],
                ['BotL', 'BotM', 'BotR'],
            ]
            const turningUpLookup = [
                ['TopL', 'TopM', 'TopR'],
                ['BotL', 'Mid', 'BotR'],
                ['BotL', 'BotM', 'BotR'],
            ]

            const traversingBottom = [
                ['BotL', 'TopM', 'BotR'],
                ['BotL', 'Mid', 'BotR'],
                ['BotL', 'BotM', 'BotR'],
            ]

            let ent = pathLookup[prevY - currY + 1][prevX - currX + 1]
            let exit = pathLookup[nextY - currY + 1][nextX - currX + 1]

            //traverses along bottom from start
            if (prevPos === 'start' && nextX > currX) {
                ent = traversingBottom[prevY - currY + 1][prevX - currX + 1]
                exit = traversingBottom[nextY - currY + 1][nextX - currX + 1]
            }

            //traverses along bottom other
            if (prevY === currY && currY === maxRow) {
                ent = traversingBottom[prevY - currY + 1][prevX - currX + 1]
                exit = traversingBottom[nextY - currY + 1][nextX - currX + 1]
            }
            //execute turns at cottom end of column
            if (
                (currX < nextX && prevY < currY) |
                (currX > prevX && nextY < currY)
            ) {
                ent = turningUpLookup[prevY - currY + 1][prevX - currX + 1]
                exit = turningUpLookup[nextY - currY + 1][nextX - currX + 1]
            }
            //constructname of svgto use
            let path = ent.concat('to', exit)
            //adds end point to path
            if (nextPos === 'finish') {
                path = path.concat('End')
            }

            const ref = 'xy'.concat(currX.toString(), currY.toString())
            let newPath = paths[path]
            if (currY === 0) newPath = topPaths[path]

            aislestoVisit[ref] = {
                path: newPath,
                shopping: curr[2],
                pathText: path,
            }
        }
        return aislestoVisit
    }

    const height = { mm: 160, mr: 160, ml: 160 }
    const output = genPath(arrayAisles)

    const aislesToVisit = assignSVGtoPath(output)
    const createMap = () => {
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
                                                ? aislesToVisit[xy].shopping
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
            {createMap()}
            <Link to="/aisleList" className="shoppingListCompleteButton">
                Get Started...
            </Link>
        </div>
    )
}

export default ShopMap
