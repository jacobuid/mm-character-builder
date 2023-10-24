import React, { Component } from "react";

class Row extends Component {
  render() {
    let { className, ...props } = this.props;
    return (
      <div className={className ? "mm-row " + className : "mm-row"} {...props}>
        {this.props.children}
      </div>
    );
  }
}

class Container extends Component {
  render() {
    let { className, size, ...props } = this.props;
    if (this.size) {
      return (
        <section
          className={
            className
              ? `mm-container-${size} ` + className
              : `mm-container-${size}`
          }
          {...props}
        >
          {this.props.children}
        </section>
      );
    } else {
      return (
        <section
          className={className ? "mm-container " + className : "mm-container"}
          {...props}
        >
          {this.props.children}
        </section>
      );
    }
  }
}

class Spacer extends Component {
  render() {
    return <div className="mm-container-gutter"></div>;
  }
}

class VerticalRule extends Component {
  render() {
    return <div className="mm-vertical-rule"></div>;
  }
}

class Box extends Component {
  render() {
    return (
      <article className="mm-box">
        <span className="mm-box-tag">{this.props.tag}</span>
        {this.props.children}
      </article>
    );
  }
}

export { Row, Container, Spacer, Box, VerticalRule };
