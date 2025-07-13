interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBar(props: SearchBarProps) {
  const { value, onChange, onSearch } = props;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  return (
    <div className="flex flex-row items-center justify-center h-40 bg-gray-100 p-4 gap-4">
      <input
        type="text"
        className="border border-gray-400 rounded px-3 py-2 w-64 focus:outline-blue-500"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Star Trek books..."
      />
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
