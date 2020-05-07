import React, { Component } from 'react'
import { Link } from '@reach/router'
import Loader from './Loader'
import * as api from '../utils/api'
import distance from '../utils/distance'
import { Button } from '@material-ui/core'

export default class SupermarketList extends Component {
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
        const { userLocation } = this.props
        const { supermarkets, isLoading } = this.state
        if (isLoading) return <Loader />
        return (
            <div className="notepad">
                <h2>Choose your supermarket:</h2>
                {supermarkets.map((supermarket) => {
                    console.log(this.props)
                    return (
                        <div className="button supermarketButton">
                            <Button variant="contained" color="primary">
                                <Link
                                    onClick={() =>
                                        this.handleClick(supermarket)
                                    }
                                    key={supermarket._id}
                                    to="/shopmap"
                                >
                                    <div className="superMarketName">
                                        {supermarket.name}
                                    </div>
                                    <div>
                                        {`Distance: ${distance(
                                            userLocation[0],
                                            userLocation[1],
                                            supermarket.location[0],
                                            supermarket.location[1],
                                            'K'
                                        ).toFixed(2)}km`}
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
