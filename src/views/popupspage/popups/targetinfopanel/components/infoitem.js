import React from "react";

function InfoItem({ lableText, value }) {
    return (
        <div className="col w-1/2 my6 flex">
            <label>{lableText}：</label>
            <span className="txt-truncate fx1">{value}</span>
        </div>
    )
}

export default InfoItem