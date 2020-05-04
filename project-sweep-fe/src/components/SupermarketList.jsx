import React, { Component } from 'react'
import { Link } from '@reach/router'
// import supermarkets from '../staticData/supermarkets'
import * as api from '../utils/api'

export default class SupermarketList extends Component {
    state = { isLoading: true, supermarkets: [] }

    componentDidMount() {
        api.getSupermarkets().then(({ supermarkets }) => {
            this.setState({ supermarkets })
        })
    }

    handleClick = (supermarket) => {
        this.props.setSupermarket(supermarket)
    }

    render() {
        const { supermarkets } = this.state
        return (
            <div className="notepad">
                <h2>Supermarket List</h2>
                {supermarkets.map((supermarket) => {
                    return (
                        <Link
                            onClick={() => this.handleClick(supermarket)}
                            key={supermarket._id}
                            to="/shopmap"
                            className="shoppingListCompleteButton"
                        >
                            {supermarket.name} -{supermarket._id}
                        </Link>
                    )
                })}
            </div>
        )
    }
}
