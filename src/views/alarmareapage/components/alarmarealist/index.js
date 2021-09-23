import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { Table, Button, Switch } from 'antd'

import { setEditAreaId, setVisiblePanel } from "@/redux/alarmareapageslice"
import { setMapViewState } from "@/redux/basemapslice"
import { MAP_CHANGE_TRANSITION } from "@/config/constants/default-consts-config"

import { getFitViewport, getAreaGrpFilters } from "../../lib"

function AlarmAreaList() {
    const dispatch = useDispatch()
    const { areaList, editAreaId } = useSelector(state => state.alarmAreaPage)
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

    const toEditArea = (record) => {
        if (record.areaId === editAreaId) {
            dispatch(setEditAreaId(null))
            return
        }
        dispatch(setEditAreaId(record.areaId))
        dispatch(setVisiblePanel(new Set(['editArea'])))
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
            onFilter: (value, record) => record.groupName === value,
            filters: getAreaGrpFilters(areaList)
        },
        {
            title: '启用报警',
            dataIndex: 'isActive',
            render: (isActive, record) => <Switch checked={isActive} onChange={checked => onIsActiveChange(checked, record)} />,
            onFilter: (value, record) => record.isActive === value,
            filters: [
                { text: '启用', value: 1 },
                { text: '不启用', value: 0 },
            ]
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record, index) => <Button type="link" onClick={() => toEditArea(record)}>编辑</Button>
        }
    ]

    return (
        <Draggable
            defaultPosition={{ x: 10, y: 250 }}
        >
            <div className="alarmAreaPage absolute bg-white w600">
                <div className="h36 flex flex--center-cross txt-h5 ml12">报警区域</div>
                <div className="content py12 px18">
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

export default AlarmAreaList