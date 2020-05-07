import React, { Component } from 'react'
import { Link } from '@reach/router'
import LoaderPath from '../components/LoaderPath'
import MapBox from './MapBox'
import CreateMap from './CreateMap'
import Button from '@material-ui/core/Button'

class AisleMap extends Component {
    render() {
        const { aisleCount, aisleOrder, pathMaps, ismaploading } = this.props

        let thisAisle = aisleOrder[aisleCount - 1]
        const nextAisle = aisleOrder[aisleCount]

        if (aisleCount === 0) {
            thisAisle = 'start'
        }
        console.log(thisAisle, nextAisle)

        const {
            xStart,
            yStart,
            width,
            height,
            layout,
            ai,
            aislesToVisit,
            svgPath,
            aisleListCat,
            listItems,
        } = pathMaps[thisAisle]

        const superMap = CreateMap(
            layout,
            ai,
            aislesToVisit,
            svgPath,
            aisleListCat,
            listItems
        )

        if (ismaploading) return <LoaderPath />
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
                <MapBox
                    xStart={xStart}
                    yStart={yStart}
                    width={width}
                    height={height}
                    superMap={superMap}
                    layout={layout}
                />
                <Button variant="contained" color="primary">
                    <Link to="/aisleList">Next list...</Link>
                </Button>
            </div>
        )
    }
}

export default AisleMap
