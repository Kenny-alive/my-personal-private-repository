interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-center h-40 p-4 gap-4"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <input
        type="text"
        className="border rounded px-3 py-2 w-64 focus:outline-blue-500"
        style={{
          borderColor: 'var(--text-color)',
          color: 'var(--text-color)',
          backgroundColor: 'var(--bg-color)',
        }}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Star Trek books..."
      />
      <button
        className="px-5 py-2 rounded transition"
        style={{
          backgroundColor: 'var(--link-color)',
          color: 'var(--bg-color)',
        }}
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}
