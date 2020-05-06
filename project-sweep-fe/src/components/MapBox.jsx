import React from 'react'

function MapBox(props) {
    const { xStart, yStart, width, height, superMap, layout } = props
    // console.log(xStart, yStart, width, height, superMap, layout)
    const vbWidth = layout[0].length * 80
    const vbHeight = 200 * layout.length
    const vbX = xStart * 80
    const vbY = yStart < layout.length - 3 ? 200 + (yStart - 1) * 160 : 0
    const zoomx = Math.max((vbWidth * width) / layout[0].length, 80)
    const zoomy = Math.max(
        (vbHeight * Math.min(height, layout.length)) / layout.length,
        160
    )
    return (
        <svg
            className="shopMapSVG"
            width={vbWidth}
            height={vbHeight}
            viewBox={`${vbX} ${vbY} ${zoomx} ${zoomy}`}
        >
            {superMap}
        </svg>
    )
}
export default MapBox
