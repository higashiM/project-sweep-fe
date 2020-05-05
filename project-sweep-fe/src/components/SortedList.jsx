import React, { Component } from 'react'
import sortListItems from '../utils/sortListItems'
// const foods = require('../staticData/foods')

const SortedList = (props) => {
    return (
        <main className="sorted-list">
            {sortListItems(props.listItems).map((category, index) => {
                return (
                    <section key={category + index}>
                        <h3>{category.name}</h3>
                        <ul>
                            {category.items.map((item, index) => {
                                return <li key={item + index}>{item}</li>
                            })}
                        </ul>
                    </section>
                )
            })}
        </main>
    )
}

export default SortedList
