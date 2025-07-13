function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
      <span className="text-2xl font-semibold text-blue-600">Loading...</span>
    </div>
  );
}

export default Loading;
