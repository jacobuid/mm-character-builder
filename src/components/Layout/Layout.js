import React, { Component } from "react";

class Row extends Component {
    render() {
        let { ...props } = this.props;
        return (
            <div className={`wp-row`} {...props}>
                {this.props.children}
            </div>
        );
    }
}

class Container extends Component {
    render() {
        if(this.props.size){
            return (
                <section className={`wp-container-${this.props.size}`}>
                    {this.props.children}
                </section>
            )
        } else {
            return (
                <section className={`wp-container`}>
                    {this.props.children}
                </section>
            )
        }
    }
}

class Spacer extends Component {
    render() {
        return <div className="wp-container-gutter"></div>;
    }
}

class VerticalRule extends Component {
    render() {
        return <div className="wp-vertical-rule"></div>;
    }
}

class Box extends Component {
    render() {
        return (
            <article className="wp-box">
                <span className="wp-box-tag">{this.props.tag}</span>
                {this.props.children}
            </article>
        );
    }
}

export { Row, Container, Spacer, Box, VerticalRule };
