import { useEffect, useRef, useState } from "react";

const SortFilter = ({ sortFilter, setSortFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Updated to include "Returns"
  const sortOptions = ["Popularity", "Minimum Amount", "Recently Rebalanced"];
  const timePeriods = ["1M", "6M", "1Y", "3Y", "5Y"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-64 border-b bg-white p-4 relative" ref={dropdownRef}>
      {/* Trigger */}
      <div
        className="cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-light text-gray-500">
          Sort by{" "}
          <span className="font-medium text-gray-800">{sortFilter}</span>
        </h3>
        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-500 ${
            isOpen ? "" : "transform rotate-180"
          } text-gray-600`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 6a1 1 0 01.7.3l4 4a1 1 0 01-1.4 1.4L10 8.42l-3.3 3.3a1 1 0 01-1.4-1.42l4-4A1 1 0 0110 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-10 left-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10">
          {/* Sort Options Section */}
          <div className="mb-4">
            <div className="flex flex-col space-y-2">
              {sortOptions.map((option) => (
                <label
                  key={option}
                  htmlFor={option}
                  className="flex items-center justify-between space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-sm text-gray-400">{option}</span>
                  <input
                    id={option}
                    type="radio"
                    name="sortFilter"
                    value={option}
                    checked={sortFilter === option}
                    onChange={(e) => setSortFilter(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Time Period Section */}
          <div>
            <h3 className="text-sm font-normal text-gray-700 p-2 ">Returns</h3>
            <h4 className="text-sm font-medium text-gray-400 p-2 ">
              Time period
            </h4>
            <div className="flex flex-wrap gap-2 p-2">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSortFilter(period + " (H → L)")}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    sortFilter.substring(0, 2) === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {timePeriods.includes(sortFilter.substring(0, 2)) && (
            <div className="p-2">
              <h4 className="text-sm font-medium text-gray-400 my-2">
                Order By
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSortFilter(sortFilter.substring(0, 2) + " (H → L)")
                  }
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    sortFilter.substring(3) === "(H → L)"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  High-Low
                </button>
                <button
                  onClick={() =>
                    setSortFilter(sortFilter.substring(0, 2) + " (L → H)")
                  }
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    sortFilter.substring(3) === "(L → H)"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } `}
                >
                  Low-High
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SortFilter;
