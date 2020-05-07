import React from 'react'
import { Link } from '@reach/router'
import * as genMap from '../utils/genMap'
import Loader from '../components/Loader'
import CreateMap from './CreateMap'
import MapBox from './MapBox'

const ShopMap = (props) => {
    const categoryLookup = props.supermarket.categoryLookup
    const listItems = props.listItems

    const aisleListCat = genMap.getAisleList(listItems, categoryLookup)

    const arrayAisles = aisleListCat.aisleList

    const ai = props.supermarket.aisleInfo

    const layout = props.supermarket.layout

    const pathOfAisles = genMap.genPath(arrayAisles, layout, ai)

    const aislesToVisit = genMap.assignSVGtoPath(pathOfAisles)

    const svgPath = genMap.genPathSVG(pathOfAisles, aislesToVisit)

    const superMap = CreateMap(layout, ai, aislesToVisit, svgPath)

    const handleClick = () => {
        const pathMaps = {}

        const pathOfWayPoints = pathOfAisles.filter(
            (point) => Number.isInteger(point[2]) | (point[2] === 'start')
        )

        pathOfWayPoints.forEach((path, index) => {
            const xStart = path[0]
            const yStart = Math.min(path[1], layout.length - 1) //added min to take account for start at 0,3
            let width = layout[0].length
            let height = layout.length
            if (pathOfWayPoints[index + 1]) {
                width = Math.abs(pathOfWayPoints[index + 1][0] - path[0]) + 1
                height = Math.abs(pathOfWayPoints[index + 1][1] - path[1]) + 1
            }
            pathMaps[path[2]] = {
                xStart,
                yStart,
                width,
                height,
                layout,
                ai,
                aislesToVisit,
                svgPath,
            }
        })
        const categories = aisleListCat.catAndFood
        const path = pathOfWayPoints
            .map((point) => point[2])
            .filter((point) => Number.isInteger(point))
        props.setAisletoVisitInfo({ categories, path, pathMaps })
        console.log(categories, path, pathMaps)
    }

    if (props.ismaploading) return <Loader />

    return (
        <div className="shopMap">
            <h2 className="mapTitle">Shop Map</h2>

            <MapBox
                xStart={0}
                yStart={0}
                width={layout[0].length}
                height={layout.length}
                superMap={superMap}
                layout={layout}
            />
            <Link
                to="/aisleMap"
                className="shoppingListCompleteButton"
                onClick={() => handleClick()}
            >
                Get Started...
            </Link>
        </div>
    )
}

export default ShopMap
