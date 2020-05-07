import React from 'react'
import { Link } from '@reach/router'
import sortListItems from '../utils/sortListItems'
import Button from '@material-ui/core/Button'

const SummaryPage = (props) => {
    return (
        <div className="notepad">
            <h3>Shopping trip complete</h3>
            <p>Here are the items you missed:</p>
            <div>
                {sortListItems(props.listItems).map((category, index) => {
                    return (
                        <section key={category + index}>
                            <h3>{category.name}</h3>
                            <ul>
                                {category.items.map((item, index) => {
                                    return (
                                        <li
                                            key={item + index}
                                        >{`${item[0]} ${item[1]}`}</li>
                                    )
                                })}
                            </ul>
                        </section>
                    )
                })}
            </div>
            <div className="button">
                <Button variant="contained" color="primary">
                    <Link to="/">Keep items for next time</Link>
                </Button>
            </div>
            <div className="button">
                <Button variant="contained" color="primary">
                    <Link to="/" onClick={props.clearList}>
                        Clear list
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default SummaryPage
