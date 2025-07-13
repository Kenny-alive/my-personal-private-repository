interface ErrorMessageProps {
  message: string;
}

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className="text-red-600 text-center min-h-[300px] flex items-center justify-center">
      <p>Error: {props.message}</p>
    </div>
  );
}

export default ErrorMessage;
