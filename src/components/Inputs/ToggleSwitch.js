import React from 'react';

function ToggleSwitch(props) {
    return (
        <label className="switch">
            <input type="checkbox" {...props} />
            <span className="slider round"></span>
        </label>
    );
}

export default ToggleSwitch;