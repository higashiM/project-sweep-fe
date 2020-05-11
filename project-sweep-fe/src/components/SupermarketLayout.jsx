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

export default function SupermarketLayout(props) {
    const { layout, aisleInfo } = props

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="shopMap_creator"
            width={300}
            height={300}
            viewBox={`${0} ${0} ${layout[0].length * 80} ${
                200 * layout.length
            }`}
        >
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
                return showAisle(aisleNum, posx + 45, posy + 80)
            })}
            <Trolley x={15} y={200 + (layout.length - 2) * 160 + 120} />
        </svg>
    )
}
