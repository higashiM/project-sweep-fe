import React from 'react'
import { Link } from '@reach/router'
import supermarkets from '../staticData/supermarkets'

const SupermarketList = () => {
    return (
        <div className="notepad">
            <h2>Supermarket List</h2>
            {supermarkets.map((supermarket) => {
                return (
                    <Link to="/shopmap" className="shoppingListCompleteButton">
                        {supermarket.name}
                    </Link>
                )
            })}
        </div>
    )
}

export default SupermarketList
