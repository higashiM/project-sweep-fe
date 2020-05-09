//import { paths, drawWayPoint, showAisle } from '../resources/maplayout/paths'
import { paths } from '../resources/maplayout/pathsSVG'

export const getAisleList = (listItems, categoryLookup) => {
    const aisleList = []
    const catAndFood = {}
    const food = {}

    for (const item in listItems) {
        const element = listItems[item]

        if (categoryLookup[element.category.name]) {
            const aisleNo = categoryLookup[element.category.name]

            if (!catAndFood[aisleNo]) catAndFood[aisleNo] = []
            if (!catAndFood[aisleNo].includes(element.category.name)) {
                catAndFood[aisleNo].push(element.category.name)
            }
            if (!aisleList.includes(aisleNo)) {
                aisleList.push(aisleNo)
            }

            if (!food[aisleNo]) food[aisleNo] = []
            food[aisleNo].push(element.foodName)
        } else console.log('category not found in lookup', element)
    }
    return { aisleList, catAndFood, food }
}

export const genPath = (aislesToVisit, layout, ai) => {
    const start = [0, layout.length, 'start']
    const maxRow = layout.length - 1
    // const maxColumn = layout[0].length

    const columnsToTraverse = {} //lookup object for colums containg aisles to visit
    const aisleTickOff = {} //object to count off which aisles have been visited

    aislesToVisit.forEach((aisle) => {
        const x = ai[aisle].x
        const y = ai[aisle].y
        if (!columnsToTraverse[x]) columnsToTraverse[x] = {}
        if (!columnsToTraverse[x].ys) columnsToTraverse[x].ys = []
        if (columnsToTraverse[x].ys) columnsToTraverse[x].ys.push(y)
        const ref = 'xy'.concat(x, y)
        aisleTickOff[ref] = aisle
    })

    for (const key in columnsToTraverse) {
        const element = columnsToTraverse[key]
        const arrayOfY = element.ys
        element.maxY = Math.max(...arrayOfY)
        element.minY = Math.min(...arrayOfY)
    }

    const MaxX = Math.max(...Object.keys(columnsToTraverse))
    const MinX = Math.min(...Object.keys(columnsToTraverse))

    columnsToTraverse.MaxX = MaxX
    columnsToTraverse.MinX = MinX

    //cycles through map from bottom left to rop right starting at (x = 0, maxRow)
    //if column has an aisle to visit it traverses in alternative directions otherwise moves horizontally

    const aislePath = [start]
    // console.log(aisleTickOff)
    const goForaWalk = (
        x,
        y,
        aisleTickOff,
        columnsToTraverse,
        goingUp,
        aislePath
    ) => {
        const ref = 'xy'.concat(x, y)
        //console.log(goingUp, x, y, aislePath, columnsToTraverse, aisleTickOff)

        //add current location to the path - if aisle need to visit delete from checklist
        if (aisleTickOff[ref]) {
            aislePath.push([x, y, aisleTickOff[ref]])
            delete aisleTickOff[ref]
        } else aislePath.push([x, y, ''])
        //if no items left add finish block
        if (Object.keys(aisleTickOff).length === 0) {
            if (!goingUp) aislePath.push([x, y + 1, 'finish'])
            if (goingUp) aislePath.push([x, y - 1, 'finish'])

            return aislePath
        }

        //SIMPLE RULES
        //1. IF  something in the column continue in the direction you are going
        //2. if you have everything in the column wait until you reach an item you want in the adacent column before switching if applicable
        //3,if nothing to get next column seitch over when you have everything in this column

        const somethingToGet =
            (columnsToTraverse[x] && y > columnsToTraverse[x].minY && goingUp) |
            (columnsToTraverse[x] && y < columnsToTraverse[x].maxY && !goingUp)

        const reachedFinalObject =
            (columnsToTraverse[x] &&
                y <= columnsToTraverse[x].minY &&
                goingUp) |
            (columnsToTraverse[x] && y >= columnsToTraverse[x].maxY && !goingUp)

        const readyToTurnForNextColumn =
            columnsToTraverse[x + 1] &&
            (columnsToTraverse[x + 1].minY >= y && goingUp) |
                (columnsToTraverse[x + 1].maxY <= y && !goingUp)

        const nothingToGetThisColumn = !columnsToTraverse[x]
        const nothingToGetNextColumn = !columnsToTraverse[x + 1]

        if (
            (reachedFinalObject | nothingToGetThisColumn) &
            (readyToTurnForNextColumn | nothingToGetNextColumn)
        ) {
            return goForaWalk(
                x + 1,
                y,
                aisleTickOff,
                columnsToTraverse,
                (goingUp = !goingUp),
                aislePath
            )
        }

        if (
            (somethingToGet && !goingUp) |
            (!nothingToGetNextColumn && !readyToTurnForNextColumn && !goingUp)
        ) {
            return goForaWalk(
                x,
                y + 1,
                aisleTickOff,
                columnsToTraverse,
                goingUp,
                aislePath
            )
        }

        if (
            (somethingToGet && goingUp) |
            (!nothingToGetNextColumn && !readyToTurnForNextColumn && goingUp)
        ) {
            return goForaWalk(
                x,
                y - 1,
                aisleTickOff,
                columnsToTraverse,
                goingUp,
                aislePath
            )
        }

        return aislePath
    }

    return goForaWalk(
        0,
        maxRow,
        aisleTickOff,
        columnsToTraverse,
        true,
        aislePath
    )
}

export const assignSVGtoPath = (aislePath, maxRow) => {
    //object look up constructed for rendering
    const aislestoVisit = {}

    for (let index = 1; index < aislePath.length - 1; index++) {
        const curr = aislePath[index]
        const prev = aislePath[index - 1]
        const next = aislePath[index + 1]
        const nextNext = aislePath[index + 1]

        const prevX = prev[0]
        const prevY = prev[1]
        const currX = curr[0]
        const currY = curr[1]
        const nextX = next[0]
        const nextY = next[1]

        const nextNextY = nextNext[1]

        const prevPos = prev[2]
        const nextPos = next[2]
        const currPos = curr[2]
        const nextNextPos = nextNext[2]

        //paths can be constructed above or below the shelves on same tile
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

        const prevExittoEntLookup = {
            BotL: 'BotR',
            BotR: 'BotL',
            TopL: 'TopR',
            TopR: 'TopL',
            BotM: 'TopM',
            TopM: 'BotM',
        }
        const waypointLookUp = {
            TopLtoTopR: 'BotR',
            TopLtoTopM: 'BotM',
            TopRtoTopL: 'BotL',
            BotRtoBotL: 'TopL',
            BotLtoBotR: 'TopR',
            BotLtoBotM: 'TopM',
            BotRtoBotM: 'TopM',
            TopRtoBotM: 'BotM',
            TopMtoTopR: 'BotR',
        }

        let ent = pathLookup[prevY - currY + 1][prevX - currX + 1]
        let exit = pathLookup[nextY - currY + 1][nextX - currX + 1]

        const prevRef = 'xy'.concat(prevX.toString(), prevY.toString())
        let prevExit = null
        if (aislestoVisit[prevRef]) prevExit = aislestoVisit[prevRef].exit

        //traverses along other
        if (prevY === currY && currY === nextY && !currPos) {
            if (prevExit) {
                ent = prevExittoEntLookup[prevExit]
                exit = prevExittoEntLookup[ent]
            }
        }

        //traverses along bottom from start
        if (prevPos === 'start' && nextX > currX && !currPos) {
            ent = traversingBottom[prevY - currY + 1][prevX - currX + 1]
            exit = traversingBottom[nextY - currY + 1][nextX - currX + 1]
        }

        //execute turns at bottom end of column
        if (
            (currX < nextX && prevY < currY) | (currX > prevX && nextY < currY)
        ) {
            ent = turningUpLookup[prevY - currY + 1][prevX - currX + 1]
            exit = turningUpLookup[nextY - currY + 1][nextX - currX + 1]
        }
        //execute turns at top of column if next two same level or going down

        /*         if (nextNext) {
            if (
                prevY < currY &&
                currX < nextX &&
                nextY >= currY &&
                nextNextY >= currY
            ) {
                ent = pathLookup[prevY - currY + 1][prevX - currX + 1]
                exit = pathLookup[nextY - currY + 1][nextX - currX + 1]
            }
        } */

        //execute turns at top of column if next is final waypoint

        if (nextNext) {
            if (
                prevY < currY &&
                currX < nextX &&
                nextY >= currY &&
                nextNextPos === 'finish'
            ) {
                ent = pathLookup[prevY - currY + 1][prevX - currX + 1]
                exit = pathLookup[nextY - currY + 1][nextX - currX + 1]
            }
        }

        if (prevExit) {
            ent = prevExittoEntLookup[prevExit]
        }
        //constructname of svgto use
        let path = ent.concat('to', exit)

        //overwrite if waypointLookUp
        if (currPos && waypointLookUp[path]) {
            exit = waypointLookUp[path]
            path = ent.concat('to', exit)
        }

        //adds end point to path
        if (nextPos === 'finish') {
            path = path.concat('End')
        }

        if (prevPos === 'aiMapStart') {
            path = 'End'.concat(path)
        }

        const ref = 'xy'.concat(currX.toString(), currY.toString())
        let newPath = paths[path]

        const waypoint = currPos ? currPos : null
        //constructs onject for renderingsvg
        aislestoVisit[ref] = {
            waypoint,
            path: newPath,
            pathText: path,
            ent,
            exit,
        }
        //add array of waypoints in order for testing/passing to next screens
        if (!aislestoVisit.waypoints) aislestoVisit.waypoints = []

        if (waypoint) aislestoVisit.waypoints.push(waypoint)
    }
    // console.log(aislePath, aislestoVisit)

    return aislestoVisit
}

export const genPathSVG = (path, aislestoVisit, aisleMap, layoutLength) => {
    //  console.log(layoutLength)

    const moveY = -80 + (path[1][1] - (layoutLength - 1)) * 160
    const moveX = 80 * path[1][0]

    let concatPath = ' '
    if (aisleMap && path[0][2] !== 'start') {
        concatPath = concatPath.concat('m', moveX, ' ', moveY)
    } else concatPath = concatPath.concat('v-5')

    for (let index = 1; index < path.length - 1; index++) {
        const element = path[index]

        const x = element[0]
        const y = element[1]
        const ref = 'xy'.concat(x.toString(), y.toString())
        const addPath = aislestoVisit[ref].path

        concatPath = concatPath.concat(addPath)
    }
    // console.log(concatPath)
    return concatPath
}
