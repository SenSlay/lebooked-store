export default function FilterSection({ title, options, selectedValue, onChange, isMulti = false }) {
  return (
    <div className="py-5 border-t border-gray-400">
      <h2 className="text-lg mb-3 font-semibold text-gray-800">{title}</h2>
      <div className="flex flex-col">
        {options.map(({ value, label }) => {
          const valueLowCased = value.toLowerCase();
          return (
            <label key={valueLowCased} className="flex items-center gap-3 cursor-pointer hover:bg-slate-200 rounded p-2">
              <input
                type="checkbox"
                name={title.toLowerCase()}
                checked={isMulti ? selectedValue.includes(valueLowCased) : selectedValue === valueLowCased}
                onChange={() => onChange(valueLowCased)}
                className="w-4 h-4 text-blue-600"
              />
              {label}
            </label>
          )
        })}
      </div>
    </div>
  );
}