import { useState } from 'react';

export default function CategorySelector({ tempCategories, value, onChange }) {
  const [categories, setCategories] = useState([...tempCategories]);
  // const [selection, setSelection] = useState(''); // Selected option
  const [inputValue, setInputValue] = useState(''); // User input
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  // setCategory(selection);
  // Handles adding a new or existing category
  const handleAddCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]); // Add selection
    }
    // updateCategories(category, categories.length + 1);
    onChange(category);
    // setSelection(category);
    setInputValue('');
    setShowDropdown(false);
  };

  // Handles creating a new category
  const handleCreateCategory = () => {
    if (inputValue.trim() && !categories.includes(inputValue)) {
      onChange(inputValue);
      // setSelection(inputValue); // Add to list
    }
    handleAddCategory(inputValue);
  };

  // Handles removing a selected category
  const handleRemoveCategory = () => {
    // setSelection('');
    onChange('');
  };

  return (
    <div
      className={`relative bg-white p-1.5 ${showDropdown ? 'rounded-t-md' : 'rounded-md'}`}
    >
      {/* Input field with dropdown */}
      <div className="flex gap-2">
        {value && (
          <div
            key={value}
            className="flex items-center bg-quantHighlight rounded text-md text-white px-2 gap-2 min-w-fit"
          >
            {value}
            <button
              onClick={() => handleRemoveCategory(value)}
              className=" text-white font-bold"
            >
              ✕
            </button>
          </div>
        )}
        <input
          type="text"
          className="w-full rounded outline-none"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
      </div>
      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute w-full bg-white z-10 p-2 left-0 border-t mt-1 flex flex-col gap-1 rounded-b-md">
          <h3 className="font-bold text-xs text-gray-500">
            Select an option or create one
          </h3>
          {categories
            .filter((c) => c.toLowerCase().includes(inputValue.toLowerCase()))
            .map((category) => (
              <div
                key={category}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={() => handleAddCategory(category)}
              >
                {category}
              </div>
            ))}

          {/* Create new option */}
          {inputValue.trim() && !categories.includes(inputValue) && (
            <div className="p-2 cursor-pointer" onClick={handleCreateCategory}>
              Create{' '}
              <span className="bg-quantHighlight text-white px-2 py-1 rounded-md">
                {inputValue}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
