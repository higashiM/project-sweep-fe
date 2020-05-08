import React from 'react'
import { Link } from '@reach/router'
import { Button } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class ItemSelect extends React.Component {
    state = { open: false }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }
    render() {
        const { item, categoryLookup, handleCategoryChange } = this.props
        const { open } = this.state
        return (
            <Select
                labelId="catergory dropdown"
                open={open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={item.category.name}
                onChange={(value) => {
                    handleCategoryChange(item.foodName, value.target.value)
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {Object.keys(categoryLookup).map((category, i) => {
                    return (
                        <MenuItem
                            value={category.toLowerCase()}
                            key={`${category} ${i}`}
                            onClick={() => {}}
                        >
                            {category}
                        </MenuItem>
                    )
                })}
            </Select>
        )
    }
}

class ItemCheck extends React.Component {
    state = { category: [] }

    render() {
        const {
            supermarket: { categoryLookup },
            listItems,
            handleCategoryChange,
        } = this.props
        console.log(Object.keys(categoryLookup))
        return (
            <div className="notepad">
                <h1>Item Check</h1>
                <p>
                    The chosen supermarket doesn't have categories for these
                    items.
                </p>

                <p>Please reassign based on categories in this supermarket.</p>

                {listItems
                    .filter((item) => {
                        return (
                            Object.keys(categoryLookup).indexOf(
                                item.category.name
                            ) === -1
                        )
                    })
                    .map((item) => {
                        console.log(item.category.name)
                        return (
                            <div className="formcontrol">
                                <p>{item.foodName}</p>
                                <FormControl>
                                    <InputLabel id="dropdown">
                                        Category
                                    </InputLabel>
                                    <ItemSelect
                                        item={item}
                                        categoryLookup={categoryLookup}
                                        handleCategoryChange={
                                            handleCategoryChange
                                        }
                                    />
                                </FormControl>
                            </div>
                        )
                    })}
                <div className="button">
                    <Link to="/shopmap">
                        <Button variant="contained" color="primary">
                            Go shop...
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ItemCheck
