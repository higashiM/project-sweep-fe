import React, { Component } from 'react'
import { Link } from '@reach/router'
import Loader from './Loader'
import * as api from '../utils/api'

class SupermarketsMap extends Component {
    state = { isLoading: true, supermarkets: [] }

    componentDidMount() {
        api.getSupermarkets().then(({ supermarkets }) => {
            this.setState({ supermarkets, isLoading: false })
        })
    }

    handleClick = (supermarket) => {
        this.props.setSupermarket(supermarket)
    }

    render() {
        const { supermarkets, isLoading } = this.state
        if (isLoading) return <Loader />
        return (
            <div className="notepad">
                <h2>Supermarket Selector</h2>
                {supermarkets.map((supermarket) => {
                    return (
                        <Link
                            onClick={() => this.handleClick(supermarket)}
                            key={supermarket._id}
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

export default SupermarketsMap
