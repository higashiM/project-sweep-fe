import React, { Component, createRef } from 'react'
import Loader from './Loader'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { geolocated } from 'react-geolocated'
import L from 'leaflet'
import { Link } from '@reach/router'
import { Button } from '@material-ui/core'

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/'

class SupermarketsMap extends Component {
    state = { isLoading: true }
    mapRef = createRef()

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    render() {
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
                        zoom={12}
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
                        >
                            <Popup>You are here</Popup>
                        </Marker>

                        {this.props.supermarkets.map((supermarket) => {
                            const missingCategoryItems = this.props.listItems.filter(
                                (item) => {
                                    return (
                                        Object.keys(
                                            supermarket.categoryLookup
                                        ).indexOf(item.category.name) === -1
                                    )
                                }
                            )
                            const nextLink = missingCategoryItems.length
                                ? '/itemcheck'
                                : '/shopmap'
                            return (
                                <Marker
                                    position={supermarket.location}
                                    key={supermarket._id}
                                >
                                    <Popup>
                                        <Link
                                            onClick={() =>
                                                this.props.handleClick(
                                                    supermarket
                                                )
                                            }
                                            to={nextLink}
                                        >
                                            <div className="button">
                                                <Button
                                                    className="button"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    {supermarket.name}{' '}
                                                </Button>
                                            </div>
                                        </Link>
                                    </Popup>
                                </Marker>
                            )
                        })}
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
