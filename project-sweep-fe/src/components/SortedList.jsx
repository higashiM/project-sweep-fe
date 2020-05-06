import React from 'react'
import sortListItems from '../utils/sortListItems'

const SortedList = (props) => {
    return (
        <main className="sorted-list">
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
        </main>
    )
}

export default SortedList
