import React from "react";
import classNames from "classnames";

const activeStyle = { background: '#757d82', color: '#fff' }

const Optionsfield = (props) => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => props.changeState(option)}
          checked={option.id === props.active.id}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white" style={option.id === props.active.id ? activeStyle : undefined}>
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div className={classNames("toggle-group absolute top left border border--2 border--white bg-white shadow-darken10 z1", props.className)}>
      {props.options.map(renderOptions)}
    </div>
  );
};

export default Optionsfield;
