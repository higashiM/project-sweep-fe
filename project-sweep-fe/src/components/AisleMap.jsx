import React, { Component } from 'react'
import { Link } from '@reach/router'
import LoaderPath from '../components/LoaderPath'
import CreateMap from './CreateMap'
import Button from '@material-ui/core/Button'
import * as genMap from '../utils/genMap'

class AisleMap extends Component {
    state = { newSVGPath: {}, newAislesToVisit: {}, isloading: true }

    componentDidMount = () => {
        const { aisleCount, aisleOrder } = this.props
        let thisAisle = aisleOrder[aisleCount - 1]
        const nextAisle = aisleOrder[aisleCount]
        if (aisleCount === 0) {
            thisAisle = 'start'
        }
        const pathOfAisles = this.props.pathMaps.pathOfAisles

        const layout = this.props.pathMaps.layout

        const svgSnip = this.svgSnip(pathOfAisles, thisAisle, nextAisle)
        const newAislesToVisit = genMap.assignSVGtoPath(svgSnip, layout)
        const newSVGPath = genMap.genPathSVG(
            svgSnip,
            newAislesToVisit,
            true,
            layout
        )
        //console.log(newAislesToVisit, svgSnip, layout)

        this.setState({ newAislesToVisit, newSVGPath, isloading: false })
    }

    svgSnip = (pathOfAisles, thisAisle, nextAisle) => {
        let pathSnip = []
        let foundThis = false

        for (let i = 0; i < pathOfAisles.length; i++) {
            if (pathOfAisles[i][2] === thisAisle) {
                foundThis = true
                if (thisAisle !== 'start') {
                    const start = [
                        pathOfAisles[i - 1][0],
                        pathOfAisles[i - 1][1],
                        'aiMapStart',
                    ]
                    pathSnip.push(start)
                }
            }

            if (foundThis) {
                pathSnip.push(pathOfAisles[i])
            }

            if (pathOfAisles[i][2] === nextAisle) {
                const finish = [
                    pathOfAisles[i + 1][0],
                    pathOfAisles[i + 1][1],
                    'finish',
                ]
                pathSnip.push(finish)
                //console.log(pathSnip)
                return pathSnip
            }
        }
    }
    render() {
        const { aisleCount, aisleOrder, pathMaps, ismaploading } = this.props

        const { layout, ai, aisleListCat, listItems } = pathMaps

        const { newAislesToVisit, newSVGPath, isloading } = this.state
        const thisAisle = aisleOrder[aisleCount - 1]
        const nextAisle = aisleOrder[aisleCount]

        if (ismaploading | isloading) return <LoaderPath />
        return (
            <div className="aisleMap">
                <section className="aisleMapSign">
                    <div className="aisleMapNumber">
                        <p>Next</p>
                        <p className="aisleMapNumberInd">{nextAisle}</p>
                    </div>
                    <LoaderPath
                        aisleCount={aisleCount}
                        totalAisles={aisleOrder.length}
                    />
                </section>
                <CreateMap
                    layout={layout}
                    aisleInfo={ai}
                    aislesToVisit={newAislesToVisit}
                    svgPath={newSVGPath}
                    aisleListCat={aisleListCat}
                    listItems={listItems}
                    trolleyAisle={thisAisle}
                />
                <Link to="/aisleList">
                    <Button variant="contained" color="primary">
                        Next list...
                    </Button>
                </Link>
            </div>
        )
    }
}

export default AisleMap
