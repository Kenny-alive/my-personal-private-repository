import { Component } from 'react';

interface ErrorMessageProps {
  message: string;
}

export default class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div className="text-red-600 text-center min-h-[300px] flex items-center justify-center">
        <p>Error: {this.props.message}</p>
      </div>
    );
  }
}
