import React, { Component } from 'react'
import { Link } from '@reach/router'
import LoaderPath from '../components/LoaderPath'

class AisleMap extends Component {
    render() {
        const { aisleCount, aisleOrder, pathMaps, ismaploading } = this.props
        const thisAisle = aisleOrder[aisleCount - 1]
        const nextAisle = aisleOrder[aisleCount]

        const map = pathMaps[thisAisle]

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

                <>{map}</>
                <Link to="/aisleList" className="shoppingListCompleteButton">
                    Next list...
                </Link>
            </div>
        )
    }
}

export default AisleMap
