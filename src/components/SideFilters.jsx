import React from "react";

const SideFilters = ({ filters, setFilters, investmentStrategy }) => {
  const calculateNoOfFilters = () => {
    let count = 0;
    count += filters.subscriptionType != "Show all" ? 1 : 0;
    count += filters.investmentAmount != "Any" ? 1 : 0;
    count += filters.volatility.size;
    count += filters.includeNew ? 1 : 0;
    count += filters.investmentStrategy.size;
    return count;
  };
  return (
    <div className="flex flex-col text-[#535b62]">
      {/* Header */}
      <div className="flex justify-between font-light text-gray-400 border-b border-[#dde0e4] py-3 mb-6">
        <p className="text-gray-500">
          Filters{" "}
          <span className="bg-gray-300 py-1 px-2 text-sm rounded">
            {calculateNoOfFilters()}
          </span>
        </p>
        <button
          className="text-xs font-semibold"
          onClick={() =>
            setFilters({
              subscriptionType: "Show all",
              investmentAmount: "Any",
              volatility: new Set(),
              includeNew: false,
              investmentStrategy: new Set(),
            })
          }
        >
          Clear All
        </button>
      </div>

      {/* Subscription Type */}
      <div className="mb-6 flex flex-col">
        <p className="font-semibold text-[14px] mb-3">Subscription Type</p>
        <div className="text-[#81878c] font-semibold text-sm flex border border-[#dde0e4] rounded justify-between">
          <button
            className={`w-[72px] px-2 py-1 ${
              filters.subscriptionType === "Show all"
                ? "bg-blue-100 text-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setFilters({ ...filters, subscriptionType: "Show all" });
            }}
          >
            Show all
          </button>
          <button
            className={`w-[72px] px-2 py-1 ${
              filters.subscriptionType === "Free access"
                ? "bg-blue-100 text-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setFilters({ ...filters, subscriptionType: "Free access" });
            }}
          >
            Free access
          </button>
          <button
            className={`w-[72px] px-2 py-1 ${
              filters.subscriptionType === "Fee based"
                ? "bg-blue-100 text-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setFilters({ ...filters, subscriptionType: "Fee based" });
            }}
          >
            Fee based
          </button>
        </div>
      </div>

      {/* Investment Amount */}
      <div className="mb-6">
        <p className="font-semibold text-[14px] mb-3">Investment Amount</p>
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex gap-2">
            <input
              type="radio"
              name="investment-amount"
              checked={filters.investmentAmount === "Any"}
              onChange={() => {
                setFilters({ ...filters, investmentAmount: "Any" });
              }}
            />
            Any
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="investment-amount"
              checked={filters.investmentAmount === "Under ₹ 5,000"}
              onChange={() => {
                setFilters({ ...filters, investmentAmount: "Under ₹ 5,000" });
              }}
            />
            Under ₹ 5,000
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="investment-amount"
              checked={filters.investmentAmount === "Under ₹ 25,000"}
              onChange={() => {
                setFilters({ ...filters, investmentAmount: "Under ₹ 25,000" });
              }}
            />
            Under ₹ 25,000
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="investment-amount"
              checked={filters.investmentAmount === "Under ₹ 50,000"}
              onChange={() => {
                setFilters({ ...filters, investmentAmount: "Under ₹ 50,000" });
              }}
            />
            Under ₹ 50,000
          </label>
        </div>
      </div>

      {/* Volatility */}
      <div className="mb-6">
        <p className="font-semibold text-[14px] mb-3">Volatility</p>
        <div className="flex gap-0.5 text-xs font-semibold">
          {["Low", "Medium", "High"].map((level) => (
            <div
              key={level}
              onClick={() => {
                if (filters.volatility.has(level)) {
                  filters.volatility.delete(level);
                  setFilters({
                    ...filters,
                    volatility: new Set([...filters.volatility]),
                  });
                } else {
                  setFilters({
                    ...filters,
                    volatility: new Set([...filters.volatility, level]),
                  });
                }
              }}
              className={`flex flex-col justify-center items-center border border-[#dde0e4] rounded h-[60px] w-[70px] cursor-pointer ${
                filters.volatility.has(level)
                  ? "border-2 border-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              {level}
            </div>
          ))}
        </div>
      </div>

      {/* Launch Date */}
      <div className="mb-6 text-sm">
        <p className="font-semibold text-[14px] mb-3">Launch Date</p>
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={filters.includeNew}
            onChange={() => {
              setFilters({ ...filters, includeNew: !filters.includeNew });
            }}
          />
          Include new smallcases
        </label>
      </div>

      {/* Investment Strategy */}
      <div className="flex flex-col mb-5 text-sm">
        <p className="font-semibold text-[14px] mb-3">Investment Strategy</p>
        {Array.from(investmentStrategy).map((strategy) => (
          <label key={strategy} className="flex gap-2 mb-4">
            <input
              type="checkbox"
              checked={filters.investmentStrategy.has(strategy)}
              onChange={() => {
                if (filters.investmentStrategy.has(strategy)) {
                  filters.investmentStrategy.delete(strategy);
                  setFilters({
                    ...filters,
                    investmentStrategy: new Set([
                      ...filters.investmentStrategy,
                    ]),
                  });
                } else {
                  setFilters({
                    ...filters,
                    investmentStrategy: new Set([
                      ...filters.investmentStrategy,
                      strategy,
                    ]),
                  });
                }
              }}
            />
            {strategy}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SideFilters;
