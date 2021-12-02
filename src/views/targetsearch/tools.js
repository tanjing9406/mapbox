import React from "react"

export function renderItem(item) {
    return <div className="flex flex--center-cross">
        <svg aria-hidden="true" className="icon mr12 color-blue">
            <use xlinkHref="#iconmubiaozongshu" />
        </svg>
        <span>{item.shipName}</span>
        <span className="color-gray ml12">MMSI: {item.mmsi}</span>
    </div>
}