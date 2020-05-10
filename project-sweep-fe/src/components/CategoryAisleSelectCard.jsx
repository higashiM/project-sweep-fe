import React, { Component } from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class CategoryAisleSelectCard extends Component {
    state = {
        open: false,
        categories: [],
        aisles: [],
    }

    handleChange = (event) => {
        const { categories, updateCurrent } = this.props
        console.log(event.target.value)
        categories
            ? updateCurrent('category', event.target.value)
            : updateCurrent('aisle', event.target.value)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    render() {
        const { open } = this.state
        const { categories, aisles, currentCategory, currentAisle } = this.props

        return (
            <div className="aisle-category-dropdown">
                <FormControl>
                    <InputLabel id="dropdown">
                        {categories ? 'Category' : 'Aisle'}
                    </InputLabel>
                    <Select
                        labelId={`${
                            categories ? 'category' : 'aisle'
                        }-dropdown`}
                        open={open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={categories ? currentCategory : currentAisle}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categories
                            ? categories.map((category, i) => {
                                  return (
                                      <MenuItem
                                          value={category.name.toLowerCase()}
                                          key={`${category.id} ${i}`}
                                      >
                                          {category.name}
                                      </MenuItem>
                                  )
                              })
                            : aisles.map((aisle, i) => {
                                  return (
                                      <MenuItem
                                          value={aisle}
                                          key={`${aisle} ${i}`}
                                      >
                                          {aisle}
                                      </MenuItem>
                                  )
                              })}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default CategoryAisleSelectCard
