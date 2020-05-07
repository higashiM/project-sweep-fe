import React from 'react'
import Popover from '@material-ui/core/Popover'

export default function Waypoint(props) {
    const { content, cy, anchorEl } = props

    return (
        <Popover
            anchorEl={anchorEl}
            open={true}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {content}}
        </Popover>
    )
}
