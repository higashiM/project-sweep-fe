import React, { Component } from 'react'
import foods from '../staticData/foods'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export class ItemInputForm extends Component {
    state = {
        newItem: { foodName: '', quantity: 1, category: '' },
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="new-item-form">
                <Autocomplete
                    id="auto-complete-input"
                    options={foods}
                    getOptionLabel={(option) => option.foodName}
                    style={{ width: 150 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Add Items"
                            variant="outlined"
                            onKeyUp={this.handleKeyUp}
                            value={this.state.newItem.foodName}
                            name="foodName"
                            required
                        />
                    )}
                />
                <button type="submit">Add</button>
            </form>
        )
    }
    handleKeyUp = (event) => {
        console.log(event.target.value)
        const { name, value } = event.target
        this.setState((currentState) => {
            currentState.newItem[name] = value
            return { newItem: currentState.newItem }
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { newItem } = this.state
        let foodMatch = foods.find((food) => {
            return food.foodName === newItem.foodName
        })
        if (foodMatch !== undefined) {
            this.setState(
                (currentState) => {
                    currentState.newItem.category = foodMatch.category
                    return { newItem: currentState.newItem }
                },
                () => {
                    this.props.addListItem(newItem)
                    this.setState({
                        newItem: { foodName: '', quantity: 1, category: '' },
                    })
                    console.log(this.state.newItem)
                }
            )
        } else {
            this.props.addListItem(newItem)
            this.setState({
                newItem: { foodName: '', quantity: 1, category: '' },
            })
        }
    }
}

export default ItemInputForm
