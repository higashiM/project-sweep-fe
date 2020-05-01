import React, { Component } from 'react'
import { Link } from '@reach/router'
import supermarkets from '../staticData/supermarkets'
import * as api from '../utils/api'

export default class SupermarketList extends Component {
    state = { isLoading: true }

    /*    componentDidMount() {
        api.getSupermarkets().then((data) => {
            this.setState({ supermarkets: data, isLoading: false })
        })
    } */

    render() {
        return (
            <div className="notepad">
                <h2>Supermarket List</h2>
                {supermarkets.map((supermarket) => {
                    return (
                        <Link
                            to="/shopmap"
                            className="shoppingListCompleteButton"
                        >
                            {supermarket.name}
                        </Link>
                    )
                })}
            </div>
        )
    }
}
