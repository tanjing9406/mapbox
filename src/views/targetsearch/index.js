import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { AutoComplete, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { setTargetId } from "@/redux/targetinfopanelslice"
import { targetService } from "@/lib/services"
import { renderItem } from "./tools"

import "./style.less"

function TargetSearch() {
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState({})
    const [options, setOptions] = useState([])

    const onSearchTarget = async (value) => {
        const data = await targetService.searchTarget(value)
        const options = data.map(d => ({
            value: d.targetId,
            label: renderItem(d),
            data: d
        }))
        setOptions(options)
    }

    const onSelect = (value, option) => {
        setSelectedOption(option.data)
        dispatch(setTargetId(value))
    }

    return (
        <>
            <AutoComplete
                className="w360 round-full absolute ml18 mt12"
                value={selectedOption.shipName}
                onSearch={onSearchTarget}
                onSelect={onSelect}
                options={options}
            >
                <Input
                    placeholder="船名、MMSI"
                    prefix={<SearchOutlined className="color-blue" />}
                />
            </AutoComplete>
        </>
    )
}

export default TargetSearch
