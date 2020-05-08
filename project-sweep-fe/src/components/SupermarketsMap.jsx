import React, { Component, createRef } from 'react'
import Loader from './Loader'
// import * as api from '../utils/api'
import { Map, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { geolocated } from 'react-geolocated'

class SupermarketsMap extends Component {
    state = { isLoading: true }
    mapRef = createRef()

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    handleClick = (supermarket) => {
        this.props.setSupermarket(supermarket)
    }

    render() {
        console.log(this.props)
        console.log(this.props.coords)

        const { isLoading } = this.state

        if (isLoading) return <Loader />
        return (
            <div className="mapContainer">
                {this.props.coords &&
                this.props.isGeolocationAvailable &&
                this.props.isGeolocationEnabled ? (
                    <Map
                        center={{
                            lat: this.props.coords.latitude,
                            lng: this.props.coords.longitude,
                        }}
                        length={4}
                        ref={this.mapRef}
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
