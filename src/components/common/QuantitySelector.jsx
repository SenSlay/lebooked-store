import PropTypes from 'prop-types';

const QuantitySelector = ({  
  quantity,
  setQuantity,
  onIncrement,
  onDecrement,
  onInputChange,
  }) => {
    
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow user to clear the field temporarily
    if (value === '') {
      setQuantity('');
      return;
    } else if (value < 1 || value > 9999) {
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setQuantity(numericValue);
      onInputChange?.(Math.max(0, numericValue));
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center border border-gray-300 rounded w-fit">
        <button
          onClick={() => {  
            if (quantity > 1) {
            onDecrement?.(); 
            setQuantity(prev => prev - 1);
            }
          }}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
          aria-label="Decrease quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Quantity"
          className="w-12 text-center  outline-none"
        />
        <button
          onClick={() => { onIncrement?.(); setQuantity(prev => prev + 1); }}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
          aria-label="Increase quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
};

export default QuantitySelector;
