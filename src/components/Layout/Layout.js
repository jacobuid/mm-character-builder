import React, { Component } from "react";

class Row extends Component {
    render() {
        let { className, ...props } = this.props;
        return (
            <div className={(className) ? 'wp-row ' + className : 'wp-row'} {...props}>
                {this.props.children}
            </div>
        );
    }
}

class Container extends Component {
    render() {
        let { className, size, ...props } = this.props;
        if(this.size){
            return (
                <section className={(className) ? `wp-container-${size} ` + className : `wp-container-${size}`} {...props}>
                    {this.props.children}
                </section>
            )
        } else {
            return (
                <section className={(className) ? 'wp-container ' + className : 'wp-container'} {...props}>
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
