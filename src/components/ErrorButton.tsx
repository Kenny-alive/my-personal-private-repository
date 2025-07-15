import { Component } from 'react';

interface State {
  throwError: boolean;
}

export default class ErrorButton extends Component<
  Record<string, never>,
  State
> {
  state: State = {
    throwError: false,
  };

  onClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error thrown from ErrorButton!');
    }

    return (
      <button
        onClick={this.onClick}
        className="fixed bottom-4 right-4 px-4 py-2 bg-red-600 text-white rounded shadow-md
                   transition duration-300 hover:bg-red-700 hover:scale-105 cursor-pointer"
      >
        Error Button
      </button>
    );
  }
}
