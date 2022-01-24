import React, { Component } from "react";
class TextInput extends Component {
    render() {
        let { label, size, onChange, ...other } = this.props;

        const handleChange = (e) => {
            e.target.id = this.props.id;
            onChange(e);
        };

        const handleFocus = (e) => {
            e.target.select();
            onChange(e);
        };

        const handleKeyDown = (e) => {
            e.keyCode === 13 && e.preventDefault();
        };

        return (
            <React.Fragment>
                <input
                    value={this.props.value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    className={`wp-text-input${size ? " " + size : ""}`}
                    spellCheck="false"
                    {...other}
                />
            </React.Fragment>
        );
    }
}

export default TextInput;
