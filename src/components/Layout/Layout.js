import React, { Component } from 'react';

class Row extends Component {
    render() {
        let { ...props } = this.props;
        return (
            <div className={`dnd-row`} {...props}>
                {this.props.children}
            </div>
        );
        
    }
}

class Container extends Component {
    render() {
        return (
            <section className={`dnd-container-${this.props.size}`}>
                {this.props.children}
            </section>
        );
        
    }
}

class Spacer extends Component {
    render() {
        return (
            <div className="dnd-container-gutter"></div>
        );
    }
}

class VerticalRule extends Component {
    render() {
        return (
            <div className="dnd-vertical-rule"></div>
        );
    }
}


class Box extends Component {
    render() {
        return (
            <article className="dnd-box">
                <span className="dnd-box-tag">{this.props.tag}</span>
                {this.props.children}
            </article>
        );
    }
}

export { Row, Container, Spacer, Box, VerticalRule };