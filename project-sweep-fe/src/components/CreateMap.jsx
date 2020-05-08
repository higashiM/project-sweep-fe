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
    Trolley,
} from '../resources/maplayout/index'

import { showAisle } from '../resources/maplayout/pathsSVG'
import Waypoint from './Waypoint'
//import Waypoint from './Waypoint'

export default function CreateMap(props) {
    const {
        layout,
        aisleInfo,
        aislesToVisit,
        svgPath,
        aisleListCat,
        listItems,
    } = props

    return (
        <svg
            className="shopMapSVG"
            width={layout[0].length * 80}
            height={200 * layout.length}
            viewBox={`${0} ${0} ${layout[0].length * 80} ${
                200 * layout.length
            }`}
        >
            <path
                className="path"
                d={`M45 ${200 + (layout.length - 2) * 160 + 165} ${svgPath} `}
                stroke="red"
                strokeWidth="8px"
                fill="transparent"
                strokeLinecap="round"
            ></path>

            {layout.flat().map((aisle) => {
                switch (aisleInfo[aisle].type) {
                    case 'tl':
                        return (
                            <>
                                <TopLeft x="0" y="0" />
                            </>
                        )
                    case 'tm':
                        return <TopMiddle x={aisleInfo[aisle].x * 80} y="0" />
                    case 'tr':
                        return <TopRight x={aisleInfo[aisle].x * 80} y="0" />
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
                            <>
                                <CheckoutLeft
                                    x="0"
                                    y={200 + (aisleInfo[aisle].y - 1) * 160}
                                />
                            </>
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

            {layout.flat().map((aisleNum) => {
                const aisleData = aisleInfo[aisleNum]

                const x = aisleData.x
                const y = aisleData.y
                const posy = 200 + (aisleInfo[aisleNum].y - 1) * 160
                const posx = x * 80

                const xy = 'xy' + x.toString() + y.toString()
                return (
                    <>
                        {aislesToVisit[xy] ? (
                            aislesToVisit[xy].waypoint ? (
                                <Waypoint
                                    cy={posy + 80}
                                    cx={posx}
                                    num={aisleNum}
                                    food={
                                        aisleListCat.food[aisleNum]
                                            ? aisleListCat.food[aisleNum]
                                            : null
                                    }
                                    listItems={listItems}
                                />
                            ) : (
                                showAisle(aisleNum, posx + 45, posy + 80)
                            )
                        ) : (
                            showAisle(aisleNum, posx + 45, posy + 80)
                        )}
                    </>
                )
            })}
            <Trolley x={15} y={200 + (layout.length - 2) * 160 + 120} />
        </svg>
    )
}
