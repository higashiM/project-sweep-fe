import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// import Button from '@material-ui/core/Button'
// import catergories from '../staticData/categories'
import * as api from '../utils/api'

class CategoryDropdown extends Component {
    state = {
        open: true,
        categories: [],
    }

    // useStyles = makeStyles((theme) => ({
    //     button: {
    //         display: 'block',
    //         marginTop: 0,
    //     },
    //     formControl: {
    //         margin: 0,
    //         minWidth: 120,
    //     },
    // }))

    // classes = this.useStyles()

    componentDidMount() {
        api.getCategories().then(({ categories }) => {
            const newCats = categories.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })

            this.setState({ categories: newCats })
        })
    }

    handleChange = (event) => {
        const { foodName, handleCategoryChange } = this.props
        handleCategoryChange(foodName, event.target.value)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    render() {
        const { open, categories } = this.state

        return (
            <div className="item-card-category dropdown">
                {/* <Button className={classes.button} onClick={handleOpen}></Button> */}
                {/* className={this.classes.formControl} */}
                <FormControl>
                    <InputLabel id="dropdown">Category</InputLabel>
                    <Select
                        labelId="catergory dropdown"
                        open={open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value=""
                        onChange={this.handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categories.map((catergory, i) => {
                            return (
                                <MenuItem
                                    value={catergory.name}
                                    key={`${catergory.id} ${i}`}
                                >
                                    {catergory.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default CategoryDropdown
