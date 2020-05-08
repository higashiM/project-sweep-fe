import React, { Component } from 'react'
import { Link } from '@reach/router'
import * as genMap from '../utils/genMap'
import Loader from '../components/Loader'
import CreateMap from './CreateMap'
import Button from '@material-ui/core/Button'

export default class ShopMap extends Component {
    state = { isloading: true, svgPath: {}, aislesToVisit: {} }

    componentDidMount = () => {
        this.calculatePath()
    }

    calculatePath = () => {
        const listItems = this.props.listItems
        const categoryLookup = this.props.supermarket.categoryLookup
        const aisleListCat = genMap.getAisleList(listItems, categoryLookup)
        const arrayAisles = aisleListCat.aisleList
        const ai = this.props.supermarket.aisleInfo
        const layout = this.props.supermarket.layout
        const pathOfAisles = genMap.genPath(arrayAisles, layout, ai)
        const aislesToVisit = genMap.assignSVGtoPath(pathOfAisles)

        const svgPath = genMap.genPathSVG(pathOfAisles, aislesToVisit)

        this.setState(
            { svgPath, aislesToVisit, aisleListCat, isloading: false },
            this.setDataforAisles(
                pathOfAisles,
                layout,
                ai,
                aislesToVisit,
                svgPath,
                aisleListCat,
                listItems
            )
        )
    }

    setDataforAisles = (
        pathOfAisles,
        layout,
        ai,
        aislesToVisit,
        svgPath,
        aisleListCat,
        listItems
    ) => {
        const pathMaps = {
            layout,
            ai,
            aislesToVisit,
            svgPath,
            aisleListCat,
            listItems,
            pathOfAisles,
        }
        const categories = aisleListCat.catAndFood
        const path = pathOfAisles
            .map((point) => point[2])
            .filter((point) => Number.isInteger(point))
        this.props.setAisletoVisitInfo({ categories, path, pathMaps })
    }

    render() {
        const supermarketname = this.props.supermarket.name
        const { isMapLoading } = this.props
        const { isLoading, svgPath, aislesToVisit, aisleListCat } = this.state
        const listItems = this.props.listItems
        const ai = this.props.supermarket.aisleInfo
        const layout = this.props.supermarket.layout

        console.log(this.props.supermarket.layout)

        if (isLoading | isMapLoading) {
            return <Loader />
        }
        return (
            <div className="shopMap">
                <h2 className="mapTitle">
                    Your Optimal Route @ {supermarketname}
                    <p className="mapHelp">
                        click on a waypoint to view details
                    </p>
                </h2>

                <CreateMap
                    layout={layout}
                    aisleInfo={ai}
                    aislesToVisit={aislesToVisit}
                    svgPath={svgPath}
                    aisleListCat={aisleListCat}
                    listItems={listItems}
                />
                <Button variant="contained" color="primary">
                    <Link to="/aisleMap">Get Started...</Link>
                </Button>
            </div>
        )
    }
}
