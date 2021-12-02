import React from "react"
import { useSelector } from 'react-redux'
import { TargetInfoPanel } from "./popups"

function PopupsPage() {
    const { targetId } = useSelector(state => state.targetInfoPanel)

    return (
        <>
            {targetId && <TargetInfoPanel />}
        </>
    )
}

export default PopupsPage
