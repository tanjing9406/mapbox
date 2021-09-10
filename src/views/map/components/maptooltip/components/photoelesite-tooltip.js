import React from "react"

function PhotoEleSiteTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo

    return (
        <div className="tooltip interactive" style={{ left: x, top: y }}>
            {object.cameraName}
        </div>
    )
}

export default PhotoEleSiteTooltip