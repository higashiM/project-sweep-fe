import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// import Button from '@material-ui/core/Button'
import catergories from '../staticData/categories'

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: 0,
    },
    formControl: {
        margin: 0,
        minWidth: 120,
    },
}))

export default function CategoryDropdown(props) {
    const classes = useStyles()
    // const [catergory] = React.useState('')
    const [open, setOpen] = React.useState(true)

    const handleChange = (event) => {
        const { foodName, handleCategoryChange } = props
        handleCategoryChange(foodName, event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div className="item-card-category dropdown">
            {/* <Button className={classes.button} onClick={handleOpen}></Button> */}
            <FormControl className={classes.formControl}>
                <InputLabel id="dropdown">Category</InputLabel>
                <Select
                    labelId="catergory dropdown"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={''}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {catergories.map((catergory) => {
                        return (
                            <MenuItem
                                value={catergory.categoryName}
                                key={catergory.categoryName}
                            >
                                {catergory.categoryName}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    )
}
