import React from "react";

const SideFilters = ({ filters, setFilters, investmentStrategy }) => {
  // Helper to count active filters
  const calculateNoOfFilters = () => {
    let count = 0;
    count += filters.subscriptionType !== "Show all" ? 1 : 0;
    count += filters.investmentAmount !== "Any" ? 1 : 0;
    count += filters.volatility.size;
    count += filters.includeNew ? 1 : 0;
    count += filters.investmentStrategy.size;
    return count;
  };

  // Update subscription type filter
  const handleSubscriptionChange = (type) => {
    setFilters({ ...filters, subscriptionType: type });
  };

  // Update investment amount filter
  const handleInvestmentAmountChange = (amount) => {
    setFilters({ ...filters, investmentAmount: amount });
  };

  // Toggle a volatility level in the Set
  const handleToggleVolatility = (level) => {
    const newVolatility = new Set(filters.volatility);
    newVolatility.has(level)
      ? newVolatility.delete(level)
      : newVolatility.add(level);
    setFilters({ ...filters, volatility: newVolatility });
  };

  // Toggle an investment strategy in the Set
  const handleToggleInvestmentStrategy = (strategy) => {
    const newStrategies = new Set(filters.investmentStrategy);
    newStrategies.has(strategy)
      ? newStrategies.delete(strategy)
      : newStrategies.add(strategy);
    setFilters({ ...filters, investmentStrategy: newStrategies });
  };

  // Clear all filters
  const clearAllFilters = () =>
    setFilters({
      subscriptionType: "Show all",
      investmentAmount: "Any",
      volatility: new Set(),
      includeNew: false,
      investmentStrategy: new Set(),
    });

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
        <button className="text-xs font-semibold" onClick={clearAllFilters}>
          Clear All
        </button>
      </div>

      {/* Subscription Type */}
      <div className="mb-6 flex flex-col">
        <p className="font-semibold text-[14px] mb-3">Subscription Type</p>
        <div className="flex justify-between text-[#81878c] font-semibold text-sm border border-[#dde0e4] rounded">
          {["Show all", "Free access", "Fee based"].map((type) => (
            <button
              key={type}
              className={`w-[72px] px-2 py-1 ${
                filters.subscriptionType === type
                  ? "bg-blue-100 text-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSubscriptionChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Amount */}
      <div className="mb-6">
        <p className="font-semibold text-[14px] mb-3">Investment Amount</p>
        <div className="flex flex-col gap-2 text-sm">
          {[
            { label: "Any", value: "Any" },
            { label: "Under ₹ 5,000", value: "Under ₹ 5,000" },
            { label: "Under ₹ 25,000", value: "Under ₹ 25,000" },
            { label: "Under ₹ 50,000", value: "Under ₹ 50,000" },
          ].map((option) => (
            <label key={option.value} className="flex gap-2">
              <input
                type="radio"
                name="investment-amount"
                checked={filters.investmentAmount === option.value}
                onChange={() => handleInvestmentAmountChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Volatility */}
      <div className="mb-6">
        <p className="font-semibold text-[14px] mb-3">Volatility</p>
        <div className="flex gap-0.5 text-xs font-semibold">
          {["Low", "Medium", "High"].map((level) => (
            <div
              key={level}
              onClick={() => handleToggleVolatility(level)}
              className={`flex justify-center items-center border border-[#dde0e4] rounded h-[60px] w-[70px] cursor-pointer ${
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
            onChange={() =>
              setFilters({ ...filters, includeNew: !filters.includeNew })
            }
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
              onChange={() => handleToggleInvestmentStrategy(strategy)}
            />
            {strategy}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SideFilters;
