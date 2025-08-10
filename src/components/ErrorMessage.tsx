interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-red-600 text-center min-h-[300px] flex items-center justify-center">
      <p>Error: {message}</p>
    </div>
  );
}
