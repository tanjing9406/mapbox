import React from "react"

function AISSiteTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo

    return (
        <div className="tooltip interactive" style={{ left: x, top: y }}>
            {object.aisName}
        </div>
    )
}

export default AISSiteTooltip