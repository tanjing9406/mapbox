import React, { useState } from "react"
import { Tag } from 'antd'

const { CheckableTag } = Tag

function HNHYCheckboxGrp({ options, checked = [], onChange = _ => _ }) {
    const [checkedTags, setCheckedTags] = useState(checked)

    const handleChange = (tag, checked) => {
        const nextCheckedTags = checked ? [...checkedTags, tag] : checkedTags.filter(t => t !== tag)
        setCheckedTags(nextCheckedTags)
        onChange(nextCheckedTags, tag)
    }

    return (
        <>
            {options.map(item => <CheckableTag
                key={item.id}
                checked={checkedTags.includes(item.id)}
                onChange={checked => handleChange(item.id, checked)}>{item.name}</CheckableTag>)}
        </>
    )
}

export default HNHYCheckboxGrp