import React from 'react'
import { Link } from '@reach/router'

const ShopMap = () => {
    return (
        <div className="notepad">
            <h2>Shop Map</h2>
            <Link to="/" className="shoppingListCompleteButton">
                Get Started...
            </Link>
        </div>
    )
}

export default ShopMap
