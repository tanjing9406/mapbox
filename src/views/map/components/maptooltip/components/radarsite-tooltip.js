import React from "react"

function RadarSiteTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo

    return (
        <div className="tooltip interactive" style={{ left: x, top: y }}>
            {object.radarName}
        </div>
    )
}

export default RadarSiteTooltip