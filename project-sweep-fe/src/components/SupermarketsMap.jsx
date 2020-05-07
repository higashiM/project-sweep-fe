import React, { Component, createRef } from 'react'
import { Link } from '@reach/router'
import Loader from './Loader'
import * as api from '../utils/api'
import { Map, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { geolocated } from 'react-geolocated'

class SupermarketsMap extends Component {
    state = { isLoading: true, supermarkets: [] }
    mapRef = createRef()

    componentDidMount() {
        api.getSupermarkets().then(({ supermarkets }) => {
            this.setState({ supermarkets, isLoading: false })
        })
    }

    handleClick = (supermarket) => {
        this.props.setSupermarket(supermarket)
    }

    render() {
        console.log(this.props)
        console.log(this.props.coords)

        const { supermarkets, isLoading } = this.state
        if (isLoading) return <Loader />
        return (
            <div className="notepad">
                <h2>Supermarket Selector</h2>
                {this.props.coords &&
                this.props.isGeolocationAvailable &&
                this.props.isGeolocationEnabled ? (
                    <Map
                        center={{
                            lat: this.props.coords.latitude,
                            lng: this.props.coords.longitude,
                        }}
                        length={4}
                        // ref={this.mapRef}
                        zoom={15}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[
                                this.props.coords.latitude,
                                this.props.coords.longitude,
                            ]}
                        />
                    </Map>
                ) : (
                    <Loader />
                )}
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(SupermarketsMap)
