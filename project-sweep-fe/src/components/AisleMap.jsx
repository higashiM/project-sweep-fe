import React, { Component } from 'react'
import { Link } from '@reach/router'

class AisleMap extends Component {
    state = {}
    render() {
        return (
            <>
                <Link to="/aisleList" className="shoppingListCompleteButton">
                    Next list...
                </Link>
            </>
        )
    }
}

export default AisleMap
