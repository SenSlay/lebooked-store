import PropTypes from 'prop-types';
import { useState } from 'react';

export default function FilterSection({
  title,
  options,
  selectedValue,
  onChange,
  isMulti = false,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-5 border-t border-gray-400">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 mb-3 focus:outline-none"
      >
        {title}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'h-fit opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col">
          {options.map(({ value, label }) => {
            const valueLowCased = value.toLowerCase();
            return (
              <label
                key={valueLowCased}
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-200 rounded p-2"
              >
                <input
                  type="checkbox"
                  name={title.toLowerCase()}
                  checked={
                    isMulti
                      ? selectedValue.includes(valueLowCased)
                      : selectedValue === valueLowCased
                  }
                  onChange={() => onChange(valueLowCased)}
                  className="w-4 h-4 text-blue-600"
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired, // Title should be a required string
  options: PropTypes.arrayOf(
    PropTypes.shape({
      // Array of objects with 'value' & 'label'
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string), // Can be string (single select) or array (multi select)
  ]).isRequired,
  onChange: PropTypes.func.isRequired, // Function to handle change
  isMulti: PropTypes.bool, // Optional boolean, defaults to false
};

FilterSection.defaultProps = {
  isMulti: false,
};
