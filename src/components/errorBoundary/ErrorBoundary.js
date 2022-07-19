import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(err) {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error)
      return (
        <>
          <h2>Ошибочко какая-то</h2>
        </>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
