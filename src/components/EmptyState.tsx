function EmptyState() {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center bg-gray-50 px-4">
      <p
        className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
                   bg-clip-text text-transparent select-none"
        style={{ userSelect: 'none' }}
      >
        No books found.
      </p>
      <p className="mt-4 text-xl text-gray-600">
        Try a different search term or clear the input.
      </p>
    </div>
  );
}

export default EmptyState;
