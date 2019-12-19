import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'
class TextInput extends Component {

    

    render() {
        let { label, size, onChange, placeholder, ...other } = this.props;

        const handleChange = (e) => {
            e.target.id = this.props.id;
            onChange(e);
        }

        const handleKeyDown = (e) => {
            e.keyCode === 13 && e.preventDefault()
        }

        return (
            <React.Fragment>
                <ContentEditable 
                    html={this.props.value || placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={`dnd-text-input${(size)?' '+size:''}`}
                    spellcheck="false"
                    {...other} 
                />
            </React.Fragment>
        );
    }
}

export default TextInput;