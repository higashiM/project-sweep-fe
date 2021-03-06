import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import ItemList from './components/ItemList'
import SupermarketList from './components/SupermarketList'
import ShopMap from './components/ShopMap'
import AisleList from './components/AisleList'
import AisleMap from './components/AisleMap'
import { Router } from '@reach/router'
import * as api from './utils/api'
import Loader from './components/Loader'
import SummaryPage from './components/SummaryPage'
import SupermarketCreator from './components/SupermarketCreator'
import ItemCheck from './components/ItemCheck'

class App extends Component {
    state = localStorage.getItem('appState')
        ? JSON.parse(localStorage.getItem('appState'))
        : {
              isLoading: true,
              aislesToVisitInfo: {
                  path: [0],
                  categories: [''],
                  pathMaps: {},
              },
              aisleCount: 0,
              ismaploading: true,
              supermarket: '',
              products: [],
              listItems: [],
              userLocation: [53.5347271, -2.0665093],
          }

    componentDidMount() {
        api.getProducts().then((data) => {
            this.setState({ products: data }, this.setLocation())
        })
    }

    setLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latlng = [
                    position.coords.latitude,
                    position.coords.longitude,
                ]

                this.setState({ userLocation: latlng, isLoading: false })
            },
            (error) => {
                alert(
                    'location not found defaulting home to NC HQ: lon: -2.24 lat: 53.47'
                )
                console.log(error)
                this.setState({
                    userLocation: [53.47, -2.0665093],
                    isLoading: false,
                })
            },
            { timeout: 5000 }
        )
    }

    componentDidUpdate() {
        // Remember state for the next mount
        localStorage.setItem('appState', JSON.stringify(this.state))
    }

    setSupermarket = (supermarket) => {
        this.setState({ supermarket, ismaploading: false })
    }

    setAisletoVisitInfo = (aislesToVisitInfo) => {
        this.setState({ aislesToVisitInfo })
    }

    render() {
        const {
            listItems,
            products,
            supermarket,
            ismaploading,
            userLocation,
            aislesToVisitInfo: { path, categories, pathMaps },
            aisleCount,
            isLoading,
        } = this.state
        if (isLoading) return <Loader />
        console.log(userLocation)
        return (
            <div className="App">
                <Header />
                <Router>
                    <ItemList
                        path="/"
                        clearPath={this.clearPath}
                        listItems={listItems}
                        addListItem={this.addListItem}
                        deleteListItem={this.deleteListItem}
                        handleCategoryChange={this.handleCategoryChange}
                        incrementQuantity={this.incrementQuantity}
                        products={products}
                        supermarket={supermarket}
                        handleNewProduct={this.handleNewProduct}
                        clearList={this.clearList}
                    />
                    <SupermarketList
                        listItems={listItems}
                        setSupermarket={this.setSupermarket}
                        path="/supermarketlist"
                        userLocation={userLocation}
                    />
                    <ShopMap
                        setAisletoVisitInfo={this.setAisletoVisitInfo}
                        ismaploading={ismaploading}
                        listItems={listItems}
                        supermarket={supermarket}
                        path="/shopmap"
                    />
                    <AisleList
                        path="/aisleList"
                        number={path[aisleCount]}
                        listItems={listItems}
                        aisleCount={aisleCount}
                        categories={categories}
                        aisleOrder={path}
                        removeListItems={this.removeListItems}
                        increaseAisleCount={this.increaseAisleCount}
                    />
                    <AisleMap
                        aisleCount={aisleCount}
                        categories={categories}
                        aisleOrder={path}
                        pathMaps={pathMaps}
                        path="/aisleMap"
                    />
                    <SummaryPage
                        path="/summaryPage"
                        listItems={listItems}
                        clearList={this.clearList}
                        clearPath={this.clearPath}
                    />
                    <SupermarketCreator path="/createSupermarket" />
                    <ItemCheck
                        path="itemcheck"
                        listItems={listItems}
                        supermarket={supermarket}
                        handleCategoryChange={this.handleCategoryChange}
                    />
                </Router>
            </div>
        )
    }

    addListItem = (newItem) => {
        this.setState((currentState) => {
            return { listItems: [newItem, ...currentState.listItems] }
        })
    }

    clearList = () => {
        this.setState({ listItems: [] })
    }

    deleteListItem = (itemName) => {
        this.setState((currentState) => {
            const filteredFoodList = currentState.listItems.filter((item) => {
                return item.foodName !== itemName
            })

            return { listItems: filteredFoodList }
        })
    }

    handleCategoryChange = (foodname, newCat) => {
        this.setState((currentState) => {
            const newList = currentState.listItems.map((item) => {
                if (item.foodName === foodname) {
                    return {
                        ...item,
                        category: { ...item.category, name: newCat },
                    }
                } else {
                    return item
                }
            })
            return { listItems: newList }
        })
    }

    incrementQuantity = (number, foodname) => {
        this.setState((currentState) => {
            const newList = currentState.listItems.map((item) => {
                if (item.foodName === foodname) {
                    const quantity = item.quantity + number
                    return {
                        foodName: item.foodName,
                        category: item.category,
                        quantity,
                    }
                } else {
                    return item
                }
            })
            return { listItems: newList }
        })
    }

    increaseAisleCount = () => {
        this.setState((currentState) => {
            return {
                aisleCount:
                    currentState.aisleCount ===
                    currentState.aislesToVisitInfo.path.length - 1
                        ? 0
                        : currentState.aisleCount + 1,
            }
        })
    }

    removeListItems = (checkedItems) => {
        this.setState((currState) => {
            const newList = currState.listItems.filter((item) => {
                return checkedItems.indexOf(item.foodName) === -1
            })
            return { listItems: newList }
        })
    }

    clearPath = () => {
        this.setState({
            aislesToVisitInfo: {
                path: [0],
                categories: [''],
                pathMaps: {},
            },
            supermarket: '',
            aisleCount: 0,
            ismaploading: true,
        })
    }

    handleNewProduct = (foodName, category) => {
        if (
            this.state.products.filter((product) => {
                return product.foodName.toLowerCase() === foodName.toLowerCase()
            }).length === 0
        ) {
            if (
                window.confirm(
                    `Would you like to add ${foodName} to our database under category ${category.name}?`
                )
            ) {
                api.insertProduct(foodName, category)
            }
        }
    }
}

export default App
