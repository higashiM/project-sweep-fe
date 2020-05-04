import React, { Component } from 'react'
import { Link } from '@reach/router'

class AisleMap extends Component {
    state = { currentAisle: 1 }
    render() {
        const map = this.props.pathMaps.pathMaps[this.state.currentAisle]

        return (
            <div className="aisleMap">
                <>{map}</>
                <Link to="/aisleList" className="shoppingListCompleteButton">
                    Next list...
                </Link>
            </div>
        )
    }
}

export default AisleMap
