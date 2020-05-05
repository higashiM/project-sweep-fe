import React, { Component } from 'react'
import { Link } from '@reach/router'

class AisleMap extends Component {
    render() {
        const { aisleCount, aisleOrder, pathMaps } = this.props
        const thisAisle = aisleOrder[aisleCount - 1]
        const nextAisle = aisleOrder[aisleCount]

        const map = pathMaps[thisAisle]

        return (
            <div className="aisleMap">
                <h2>
                    Aisle {thisAisle} going to {nextAisle}
                </h2>
                <>{map}</>
                <Link to="/aisleList" className="shoppingListCompleteButton">
                    Next list...
                </Link>
            </div>
        )
    }
}

export default AisleMap
