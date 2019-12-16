import React, { Component } from 'react';
import './Layout.css'

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

export { Container, Spacer, Box };