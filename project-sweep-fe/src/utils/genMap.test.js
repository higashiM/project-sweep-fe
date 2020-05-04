import * as genMap from './genMap'

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

const checkAislesExist = (actual, input) => {
    const waypoints = actual.map((aisle) => aisle[2])

    let output = true
    input.forEach((aisle) => {
        output = waypoints.includes(aisle) === output
    })
    return output
}

test('gen path - all aisles are covered for single aisle', () => {
    const input = [1]
    const actual = genMap.genPath(input, shoplayout, aisleInfo)
    expect(checkAislesExist(actual, input)).toBe(true)
})
test('gen path - all aisles are covered for multiple aisles', () => {
    const input = [1, 2, 7, 5]
    const actual = genMap.genPath(input, shoplayout, aisleInfo)
    expect(checkAislesExist(actual, input)).toBe(true)
})
test('gen path all aisles are covered for more multiple aisles', () => {
    const input = [1, 2, 7, 5, 9, 11, 12, 14, 18]
    const actual = genMap.genPath(input, shoplayout, aisleInfo)
    expect(checkAislesExist(actual, input)).toBe(true)
})

test('assignSVGtoPath- all aisles have defined SVG path for single aisle', () => {
    const input = [1]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)
    console.log(actual)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('object')
        }
    }
})

test('assignSVGtoPath- all aisles have defined SVG path for single aisle for multiple aisles', () => {
    const input = [1, 2, 7, 5]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)
    console.log(actual)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('object')
        }
    }
})
test('assignSVGtoPath- all aisles have defined SVG path for single aisle for more multiple aisles', () => {
    const input = [1, 2, 7, 5, 9, 11, 12, 14, 18]
    const path = genMap.genPath(input, shoplayout, aisleInfo)
    const actual = genMap.assignSVGtoPath(path)
    console.log(actual)

    for (const key in actual) {
        if (key !== 'waypoints') {
            const element = actual[key]
            expect(typeof element.path).toBe('object')
        }
    }
})
