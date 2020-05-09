import React from 'react'
import { Link } from '@reach/router'
import sortListItems from '../utils/sortListItems'
import Button from '@material-ui/core/Button'

const SummaryPage = (props) => {
    return (
        <div className="notepad">
            <h3>Shopping trip complete</h3>
            {props.listItems.length ? (
                <>
                    <p>Here are the items you missed:</p>
                    <div>
                        {sortListItems(props.listItems).map(
                            (category, index) => {
                                return (
                                    <section key={category + index}>
                                        <h3>{category.name}</h3>
                                        <ul>
                                            {category.items.map(
                                                (item, index) => {
                                                    return (
                                                        <li
                                                            key={item + index}
                                                        >{`${item[0]} ${item[1]}`}</li>
                                                    )
                                                }
                                            )}
                                        </ul>
                                    </section>
                                )
                            }
                        )}
                    </div>
                    <div className="button">
                        <Link
                            to="/"
                            onClick={() => {
                                props.clearPath()
                            }}
                        >
                            <Button variant="contained" color="primary">
                                Keep items for next time
                            </Button>
                        </Link>
                    </div>
                    <div className="button">
                        <Link
                            to="/"
                            onClick={() => {
                                props.clearList()
                                props.clearPath()
                            }}
                        >
                            <Button variant="contained" color="primary">
                                Clear list
                            </Button>
                        </Link>
                    </div>
                </>
            ) : (
                <Link
                    to="/"
                    onClick={() => {
                        props.clearPath()
                    }}
                >
                    <Button variant="contained" color="primary">
                        Start a new list...
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default SummaryPage
