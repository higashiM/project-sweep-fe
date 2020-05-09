import * as genMap from './genMap'
import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import CreateMap from '../components/CreateMap'
import ReactDOM from 'react-dom'

import { svgPathProperties } from 'svg-path-properties'
const shoplayout = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
]

const aisleInfo = {
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

test(`0 - createMap path [7,9,15,4,6,18] that ends in the right place`, () => {
    const input = [7, 9, 15, 4, 6, 18]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const route = genMap.assignSVGtoPath(path)

    const svgPath = genMap.genPathSVG(path, route, shoplayout, aisleInfo)

    const teststring = `M45 ${
        200 + (shoplayout.length - 2) * 160 + 165
    } ${svgPath} `
    const properties = new svgPathProperties(teststring)
    const length = properties.getTotalLength()
    const point = properties.getPointAtLength(length)
    const lastStopX = path[path.length - 2][0]
    const lastStopY = path[path.length - 2][1]
    expect(point.x).toBe(80 * lastStopX + 45)
    expect(point.y).toBeGreaterThanOrEqual(
        200 + (lastStopY - 1) * 160 + 85 - 10
    )
    expect(point.y).toBeLessThanOrEqual(200 + (lastStopY - 1) * 160 + 85 + 10)
})

for (let i = 1; i < 1000; i++) {
    const numVisits = Math.ceil(Math.random() * 16)
    const inputArray = []
    inputArray.length = numVisits
    inputArray.fill(0)
    const input = inputArray.map((num) => Math.ceil(Math.random() * 16))

    console.log(numVisits, input)
    test(`${i} - createMap path ${input.join()} that ends in the right place`, () => {
        const path = genMap.genPath(input, shoplayout, aisleInfo)
        const route = genMap.assignSVGtoPath(path)

        const svgPath = genMap.genPathSVG(path, route, shoplayout, aisleInfo)

        const teststring = `M45 ${
            200 + (shoplayout.length - 2) * 160 + 165
        } ${svgPath} `
        const properties = new svgPathProperties(teststring)
        const length = properties.getTotalLength()
        const point = properties.getPointAtLength(length)
        const lastStopX = path[path.length - 2][0]
        const lastStopY = path[path.length - 2][1]
        expect(point.x).toBe(80 * lastStopX + 45)
        expect(point.y).toBeGreaterThanOrEqual(
            200 + (lastStopY - 1) * 160 + 85 - 10
        )
        expect(point.y).toBeLessThanOrEqual(
            200 + (lastStopY - 1) * 160 + 85 + 10
        )
    })
}
