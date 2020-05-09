import * as genMap from './genMap'
import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import CreateMap from '../components/CreateMap'
import ReactDOM from 'react-dom'
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

test('1 - aisleinfo - gen path - all aisles are covered for single aisle', () => {
    const input = [1]
    const actual = genMap.genPath(input, shoplayout, aisleInfo)
    const waypoints = actual.map((aisle) => aisle[2])

    input.forEach((aisle) => {
        expect(waypoints.includes(aisle)).toBe(true)
    })
})
test('2 -aisleinfo - gen path - all aisles are covered for multiple aisles', () => {
    const input = [1, 2, 7, 5]
    const actual = genMap.genPath(input, shoplayout, aisleInfo)
    const waypoints = actual.map((aisle) => aisle[2])

    input.forEach((aisle) => {
        expect(waypoints.includes(aisle)).toBe(true)
    })
})
test('3 - aisleinfo - gen path all aisles are covered for more multiple aisles', () => {
    const input = [1, 2, 7, 5, 9, 11, 12, 14, 18]
    const actual = genMap.genPath(input, shoplayout, aisleInfo)
    const waypoints = actual.map((aisle) => aisle[2])

    input.forEach((aisle) => {
        expect(waypoints.includes(aisle)).toBe(true)
    })
})

test('4  -aisleinfo - assignSVGtoPath- all aisles have defined SVG path for single aisle', () => {
    const input = [1]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})

test('5 -aisleinfo - assignSVGtoPath- all aisles have defined SVG path for single aisle for multiple aisles', () => {
    const input = [1, 2, 7, 5]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})
test('6 - aisleinfo - assignSVGtoPath- all aisles have defined SVG path for single aisle for more multiple aisles', () => {
    const input = [1, 2, 7, 5, 9, 11, 17, 12, 14, 18]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)
    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})

const shoplayout2 = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
]

const aisleInfo2 = {
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
    13: { type: 'ml', x: 0, y: 2, num: 13 },
    14: { type: 'mm', x: 1, y: 2, num: 14 },
    15: { type: 'mm', x: 2, y: 2, num: 15 },
    16: { type: 'mm', x: 3, y: 2, num: 16 },
    17: { type: 'mm', x: 4, y: 2, num: 17 },
    18: { type: 'mr', x: 5, y: 2, num: 18 },
    19: { type: 'cl', x: 0, y: 3, num: 19 },
    20: { type: 'cm', x: 1, y: 3, num: 20 },
    21: { type: 'cm', x: 2, y: 3, num: 21 },
    22: { type: 'cm', x: 3, y: 3, num: 22 },
    23: { type: 'cm', x: 4, y: 3, num: 23 },
    24: { type: 'cr', x: 5, y: 3, num: 24 },
}

test('7 - aisleinfo2 - gen path - all aisles are covered for single aisle', () => {
    const input = [1]
    const actual = genMap.genPath(input, shoplayout2, aisleInfo2)
    const waypoints = actual.map((aisle) => aisle[2])

    input.forEach((aisle) => {
        expect(waypoints.includes(aisle)).toBe(true)
    })
})
test('8 - aisleinfo2 - gen path - all aisles are covered for multiple aisles', () => {
    const input = [1, 2, 7, 5]
    const actual = genMap.genPath(input, shoplayout2, aisleInfo2)

    const waypoints = actual.map((aisle) => aisle[2])

    input.forEach((aisle) => {
        expect(waypoints.includes(aisle)).toBe(true)
    })
})
test('9 - aisleinfo2 - gen path all aisles are covered for more multiple aisles', () => {
    const input = [1, 2, 7, 5, 9, 11, 12, 14, 18]
    const actual = genMap.genPath(input, shoplayout2, aisleInfo2)
    const waypoints = actual.map((aisle) => aisle[2])

    input.forEach((aisle) => {
        expect(waypoints.includes(aisle)).toBe(true)
    })
})

test('10 - aisleinfo2 - assignSVGtoPath- all aisles have defined SVG path for single aisle', () => {
    const input = [1]
    const path = genMap.genPath(input, shoplayout2, aisleInfo2)
    const actual = genMap.assignSVGtoPath(path)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})

test('11 -aisleinfo2 - assignSVGtoPath- all aisles have defined SVG path for single aisle for multiple aisles', () => {
    const input = [1, 2, 7, 5]
    const path = genMap.genPath(input, shoplayout2, aisleInfo2)
    const actual = genMap.assignSVGtoPath(path)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})

test('12- aisleinfo2 - assignSVGtoPath- all aisles have defined SVG path for single aisle for multiple aisles', () => {
    const input = [1, 2, 7, 5, 13, 6]
    const path = genMap.genPath(input, shoplayout2, aisleInfo2)
    const actual = genMap.assignSVGtoPath(path)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})

test('13 - aisleinfo2 - assignSVGtoPath- all aisles have defined SVG path for single aisle for more multiple aisles', () => {
    const input = [1, 2, 7, 5, 9, 11, 12, 14, 18]
    const path = genMap.genPath(input, shoplayout2, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('string')
        }
    }
})

test('14 - new svgPath function', () => {
    const input = [1, 2, 7, 5, 9, 11, 12, 14, 18]
    const path = genMap.genPath(input, shoplayout2, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)

    const result = genMap.genPathSVG(path, actual, shoplayout2, aisleInfo)
})
