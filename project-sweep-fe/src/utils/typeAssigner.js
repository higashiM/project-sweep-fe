const typeAssigner = (currentRow, newRows) => {
    if (currentRow === 0) return 't'
    if (currentRow === newRows - 1) return 'c'
    else return 'm'
}

module.exports = typeAssigner
