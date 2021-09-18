import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { Table, Button, Switch } from 'antd'

import { setMapViewState } from "@/redux/basemapslice"
import { MAP_CHANGE_TRANSITION } from "@/config/constants/default-consts-config"

import { getFitViewport } from "./lib"

import './style.less'

function AlarmAreaPage() {
    const dispatch = useDispatch()
    const { areaList } = useSelector(state => state.alarmAreaPage)
    const { deckRef } = useSelector(state => state.basemap)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        setSelectedRowKeys(selectedRowKeys)
    }

    const onIsActiveChange = (checked, record) => {
        console.log('点击启用报警按钮')
    }

    const onAreaNameClick = (record) => {
        const fitViewState = getFitViewport(record, deckRef)
        dispatch(setMapViewState({
            ...fitViewState,
            ...MAP_CHANGE_TRANSITION,
        }))
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => areaList.indexOf(record) + 1
        },
        {
            title: '名称',
            dataIndex: 'areaName',
            render: (areaName, record) => <Button type="link" onClick={() => onAreaNameClick(record)}>{areaName}</Button>
        },
        {
            title: '分组',
            dataIndex: 'groupName',
        },
        {
            title: '启用报警',
            dataIndex: 'isActive',
            render: (isActive, record) => <Switch checked={isActive} onChange={checked => onIsActiveChange(checked, record)} />
        },
        {
            title: '操作',
            dataIndex: 'action',
        }
    ]

    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="alarmAreaPage absolute bg-white w600">
                <div>报警区域</div>
                <div className="content py12 px12">
                    {/* <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                            Reload
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div> */}
                    <Table
                        size="small"
                        rowKey="areaId"
                        rowSelection={{
                            selectedRowKeys,
                            onChange: onSelectChange,
                        }}
                        columns={columns}
                        dataSource={areaList}
                    />
                </div>
            </div>
        </Draggable>
    )
}

export default AlarmAreaPage
