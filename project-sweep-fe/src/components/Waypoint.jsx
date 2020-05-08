import React from 'react'

import Popover from '@material-ui/core/Popover'

export default function Waypoint(props) {
    const { cx, cy, num, food } = props
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <svg className="wayPointButton" onClick={handleClick}>
                <g>
                    <circle id={'waypointCircle'} cx={cx + 45} cy={cy} r="13" />
                    <text
                        id={'waypointNum'}
                        x={cx + 45}
                        y={cy + 5}
                        style={{ textAnchor: 'middle' }}
                    >
                        {num}
                    </text>
                </g>
            </svg>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {food.map((item) => (
                    <div className="foodlist" id={item}>
                        {item}
                    </div>
                ))}
            </Popover>
        </>
    )
}
