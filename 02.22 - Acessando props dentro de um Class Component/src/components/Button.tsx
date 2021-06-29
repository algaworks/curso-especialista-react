import { Component } from "react";

interface ButtonProps {
  onClick?: () => any
}

class Button extends Component<ButtonProps> {
  render () {
    return <button onClick={this.props.onClick}>
      { this.props.children }
    </button>
  }
}

export default Button