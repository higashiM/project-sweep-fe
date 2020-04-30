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
            <div className="inputArea">
                <form onSubmit={this.handleSubmit} className="item-input-form">
                    <Autocomplete
                        id="auto-complete-input"
                        options={foods}
                        getOptionLabel={(option) => option.foodName}
                        onChange={this.handleKeyUp}
                        inputValue={this.state.newItem.foodName}
                        openOnFocus={false}
                        disableClearable
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Add items"
                                variant="outlined"
                                onChange={this.handleKeyUp}
                                name="foodName"
                            />
                        )}
                    />
                </form>
                <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className="addItemButton"
                >
                    Add
                </button>
            </div>
        )
    }
    handleKeyUp = (event, changeValue) => {
        const { value } = event.target
        this.setState((currentState) => {
            currentState.newItem.foodName = changeValue
                ? changeValue.foodName
                : value
            return { newItem: currentState.newItem }
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { newItem } = this.state
        let foodMatch = foods.find((food) => {
            return food.foodName === newItem.foodName
        })
        if (foodMatch === undefined) {
            this.props.addListItem({ ...newItem, category: 'none' })
            this.setState({
                newItem: { foodName: '', quantity: 1, category: '' },
            })
        } else {
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
                }
            )
        }
    }
}

export default ItemInputForm
