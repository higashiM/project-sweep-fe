import React from 'react'

const showAisle = (aisleNum, height) => {
    let x = 40
    if (aisleNum > 9) x = 35

    return (
        <>
            <text x={x} y={`${height}`}>
                {`${aisleNum}`}
            </text>
        </>
    )
}

const drawWayPoint = (cy) => {
    return <circle id="waypoint" cx="45" cy={cy - 5} r="10" fill="red" />
}

const verticalPathSection = (id, height, y) => {
    return ' v'.concat(height)
}

const horizontalPathSection = (id, width, x, y) => {
    return ' h'.concat(width)
}

const both = 150
const one = 152
const full = 160
const exit = 10
const end = 75

const verticalEnd = verticalPathSection('verticalEnd', end)
const verticalEnd_minus = verticalPathSection('verticalEnd', -end)
const fullVertical = verticalPathSection('fullVertical', full)
const fullVertical_minus = verticalPathSection('fullVertical', -full)
const topFullTraverse = horizontalPathSection('topFullTraverse', 80)
const botFullTraverse = horizontalPathSection('botFullTraverse', 80)
const topFullTraverse_minus = horizontalPathSection(
    'topFullTraverse',
    -80,
    0,
    8
)
const botFullTraverse_minus = horizontalPathSection(
    'botFullTraverse',
    -80,
    0,
    152
)

const topLTraverse = horizontalPathSection('topLTraverse ', 40)
const topRTraverse = horizontalPathSection('topRTraverse', 40)
const topLTraverse_minus = horizontalPathSection('topLTraverse ', -40)
const topRTraverse_minus = horizontalPathSection('topRTraverse', -40)
const topExit = verticalPathSection('topExit', exit)
const botExit = verticalPathSection('botExit ', exit)
const topExit_minus = verticalPathSection('topExit', -exit)
//const botExit_minus = verticalPathSection('botExit ', -exit)
const botRTraverse = horizontalPathSection('botRTraverse', 40)
const botLTraverse = horizontalPathSection('botLTraverse', 40)
const botRTraverse_minus = horizontalPathSection('botRTraverse', -40)
const botLTraverse_minus = horizontalPathSection('botLTraverse', -40)
const shortVerticalBoth = verticalPathSection('shortVerticalBoth ', both)
const shortVerticalBoth_minus = verticalPathSection('shortVerticalBoth ', -both)
const shortVerticalTop = verticalPathSection('shortVerticalTop', one)
const shortVerticalTop_minus = verticalPathSection('shortVerticalTop', -one)
const shortVerticalBot = verticalPathSection('shortVerticalBot', one, 0)
const shortVerticalBot_minus = verticalPathSection('shortVerticalBot', -one, 0)

const paths = {
    TopMtoBotMEnd: verticalEnd,
    BotMtoTopMEnd: verticalEnd_minus,
    TopLtoBotMEnd: topLTraverse.concat(verticalEnd),
    BotLtoTopMEnd: botLTraverse.concat(verticalEnd_minus),

    BotLtoTopR: botLTraverse.concat(shortVerticalBoth_minus, topRTraverse),
    fullvertical: fullVertical,

    TopLtoTopR: topFullTraverse,
    TopRtoTopL: topFullTraverse_minus,

    BotRtoBotL: botFullTraverse_minus,
    TopLtoTopM: topLTraverse.concat(topExit_minus),

    TopLtoBotR: topLTraverse.concat(shortVerticalBoth, botRTraverse),

    TopLtoBotM: topLTraverse.concat(shortVerticalTop),

    TopLtoBotL: topLTraverse.concat(shortVerticalBoth, botLTraverse_minus),

    TopMtoTopR: topExit.concat(topRTraverse),

    TopMtoTopL: topExit.concat(topLTraverse_minus),

    TopMtoBotM: fullVertical,

    BotMtoTopM: fullVertical_minus,
    BotMtoTopR: shortVerticalTop_minus.concat(topRTraverse),

    TopMtoBotL: shortVerticalBot.concat(botLTraverse_minus),

    TopMtoBotR: shortVerticalBot.concat(botRTraverse),

    TopRtoBotL: topRTraverse.concat(shortVerticalBoth, botLTraverse_minus),

    TopRtoBotM: topRTraverse.concat(shortVerticalTop),

    BotLtoTopM: botLTraverse.concat(shortVerticalBot_minus),
    BotRtoTopM: botRTraverse_minus.concat(shortVerticalBot_minus),

    TopRtoBotR: topRTraverse_minus.concat(botRTraverse, shortVerticalBoth),

    BotLtoBotR: botFullTraverse,
    BotLtoBotM: botLTraverse.concat(botExit),

    BotMtoBotR: botRTraverse,
}
export { paths, showAisle, drawWayPoint }
