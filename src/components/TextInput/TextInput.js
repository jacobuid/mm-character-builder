import React, { Component } from 'react';
import './TextInput.css'

class TextInput extends Component {
    render() {
        let { label, ...other } = this.props;

        return (
            <div>
                 <input {...other} type="text" className="dnd-text-input" autoComplete="off" style={{width:'100%'}} />
            </div>
        );
    }
}

export default TextInput;