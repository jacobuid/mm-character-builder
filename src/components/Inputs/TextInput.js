import React, { Component } from "react";
class TextInput extends Component {
  render() {
    let { label, size, onChange, onBlur, allowEnter, ...other } = this.props;

    const handleChange = (e) => {
      e.target.id = this.props.id;
      onChange(e);
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handleKeyDown = (e) => {
      if (!allowEnter) {
        e.keyCode === 13 && e.preventDefault();
      }
    };

    return (
      <React.Fragment>
        <input
          type="text"
          value={this.props.value}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className={`mm-text-input${size ? " " + size : ""}`}
          spellCheck="false"
          {...other}
        />
      </React.Fragment>
    );
  }
}

export default TextInput;
