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
} from '../resources/maplayout/index'

import { drawWayPoint, showAisle } from '../resources/maplayout/pathsSVG'

export default function CreateMap(layout, aisleInfo, aislesToVisit, svgPath) {
    console.log(svgPath)
    const midAisle = { tm: 120, tl: 120, tr: 120 }
    return (
        <>
            <path
                className="path"
                d={`M45 ${
                    200 + (layout.length - 2) * 160 + 165
                } v-5 ${svgPath}`}
                stroke="red"
                stroke-width="8px"
                fill="transparent"
                strokeLinecap="round"
            ></path>
            {layout.map((row, index) => {
                //console.log(aislesToVisit, aislePlans, aisleInfo)
                const y = index
                return (
                    <>
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
                                            y={
                                                200 +
                                                (aisleInfo[aisle].y - 1) * 160
                                            }
                                        />
                                    )
                                case 'mm':
                                    return (
                                        <MiddleMiddle
                                            x={aisleInfo[aisle].x * 80}
                                            y={
                                                200 +
                                                (aisleInfo[aisle].y - 1) * 160
                                            }
                                        />
                                    )
                                case 'mr':
                                    return (
                                        <MiddleRight
                                            x={aisleInfo[aisle].x * 80}
                                            y={
                                                200 +
                                                (aisleInfo[aisle].y - 1) * 160
                                            }
                                        />
                                    )
                                case 'cl':
                                    return (
                                        <CheckoutLeft
                                            x="0"
                                            y={
                                                200 +
                                                (aisleInfo[aisle].y - 1) * 160
                                            }
                                        />
                                    )
                                case 'cm':
                                    return (
                                        <CheckoutMiddle
                                            x={aisleInfo[aisle].x * 80}
                                            y={
                                                200 +
                                                (aisleInfo[aisle].y - 1) * 160
                                            }
                                        />
                                    )
                                case 'cr':
                                    return (
                                        <CheckoutRight
                                            x={aisleInfo[aisle].x * 80}
                                            y={
                                                200 +
                                                (aisleInfo[aisle].y - 1) * 160
                                            }
                                        />
                                    )
                                default:
                                    return null
                            }
                        })}

                        {row.map((number, index) => {
                            const aisle = aisleInfo[number]
                            const xy = 'xy' + index.toString() + y.toString()
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
                                        {aislesToVisit[xy]
                                            ? aislesToVisit[xy].waypoint
                                                ? drawWayPoint(
                                                      midAisle[aisle.type] || 80
                                                  )
                                                : null
                                            : null}
                                        {showAisle(
                                            aisle.num,
                                            midAisle[aisle.type] || 80
                                        )}
                                    </>
                                </svg>
                            )
                        })}
                    </>
                )
            })}
        </>
    )
}
