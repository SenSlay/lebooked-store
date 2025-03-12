const QuantitySelector = ({ quantity, setQuantity }) => {
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1)); // Prevent negative values

  return (
    <div className="mb-5 flex items-center gap-5">
      <div className="flex items-center border border-gray-300 rounded w-fit">
        <button 
          onClick={handleDecrement} 
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <input
          type="text"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setQuantity(isNaN(value) ? 1 : Math.max(1, value)); // Prevent invalid inputs
          }}
          aria-label="Quantity" 
          className="w-12 text-center  outline-none"
        />
        <button 
          onClick={handleIncrement} 
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector