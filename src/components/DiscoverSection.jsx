import { useEffect, useMemo, useState } from "react";
import Hero from "./Hero";
import SortFilter from "./SortFilters";
import axios from "axios";

const DiscoverSection = () => {
  const [stocks, setStocks] = useState([]);
  const [filters, setFilters] = useState({
    subscriptionType: "Show all",
    investmentAmount: "Any",
    volatility: new Set(),
    includeNew: false,
    investmentStrategy: new Set(),
  });
  const [sortFilter, setSortFilter] = useState("Popularity");

  // Fetch stocks data
  useEffect(() => {
    axios.get("smallcases.json").then(({ data }) => {
      setStocks(data);
    });
  }, []);

  // Compute unique investment strategies as a Set
  const investmentStrategy = useMemo(() => {
    return stocks.reduce((accumulator, stock) => {
      stock.info.investmentStrategy.forEach((strategy) =>
        accumulator.add(strategy.displayName)
      );
      return accumulator;
    }, new Set());
  }, [stocks]);

  // Separate sorting function
  const sortedList = useMemo(() => {
    // Clone the stocks array to avoid in-place mutation
    const stocksCopy = [...stocks];
    stocksCopy.sort((a, b) => {
      if (sortFilter === "Popularity") {
        return (
          a.brokerMeta.flags.popular.rank - b.brokerMeta.flags.popular.rank
        );
      } else if (sortFilter === "Minimum Amount") {
        return a.stats.minInvestAmount - b.stats.minInvestAmount;
      } else if (sortFilter === "Recently Rebalanced") {
        return (
          new Date(b.info.lastRebalanced) - new Date(a.info.lastRebalanced)
        );
      } else if (
        ["1M", "6M", "1Y", "3Y", "5Y"].includes(sortFilter.substring(0, 2))
      ) {
        const order = sortFilter.substring(3) === "(H → L)" ? -1 : 1;
        if (sortFilter.startsWith("1M")) {
          return order * (a.stats.returns.monthly - b.stats.returns.monthly);
        } else if (sortFilter.startsWith("6M")) {
          return (
            order * (a.stats.returns.halfyearly - b.stats.returns.halfyearly)
          );
        } else if (sortFilter.startsWith("1Y")) {
          return order * (a.stats.returns.yearly - b.stats.returns.yearly);
        } else if (sortFilter.startsWith("3Y")) {
          return (
            order * (a.stats.returns.threeYear - b.stats.returns.threeYear)
          );
        } else if (sortFilter.startsWith("5Y")) {
          return order * (a.stats.returns.fiveYear - b.stats.returns.fiveYear);
        }
      }
      return 0; // fallback
    });
    return stocksCopy;
  }, [stocks, sortFilter]);

  // Current time stored once for filtering
  const now = new Date();

  // Filtering logic
  const filteredList = useMemo(() => {
    return sortedList.filter((stock) => {
      let flag = true;

      // Subscription Type Filter
      if (filters.subscriptionType !== "Show all") {
        flag =
          filters.subscriptionType === "Free access"
            ? flag && !stock.flags.private
            : flag && stock.flags.private;
      }

      // Investment Amount Filter
      if (filters.investmentAmount !== "Any") {
        const amount = stock.stats.minInvestAmount;
        if (filters.investmentAmount === "Under ₹ 5,000") {
          flag = flag && amount <= 5000;
        } else if (filters.investmentAmount === "Under ₹ 25,000") {
          flag = flag && amount <= 25000;
        } else if (filters.investmentAmount === "Under ₹ 50,000") {
          flag = flag && amount <= 50000;
        }
      }

      // Volatility Filter
      if (filters.volatility.size) {
        // Assume riskLabel is something like "low risk" etc.
        const risk = stock.stats.ratios.riskLabel.split(" ")[0];
        flag = flag && filters.volatility.has(risk);
      }

      // Exclude New Smallcases if not included
      if (!filters.includeNew) {
        const createdDate = new Date(stock.info.created);
        createdDate.setFullYear(createdDate.getFullYear() + 1);
        flag = flag && createdDate < now;
      }

      // Investment Strategy Filter using .some()
      if (filters.investmentStrategy.size) {
        flag =
          flag &&
          stock.info.investmentStrategy.some((strategy) =>
            filters.investmentStrategy.has(strategy.displayName)
          );
      }
      return flag;
    });
  }, [sortedList, filters, now]);

  return (
    <div className="w-[1120px]">
      <h1 className="text-[24px] font-[570] py-7">Discover</h1>
      <div className="shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)] w-full flex justify-between mb-6">
        <div className="flex items-center gap-5">
          <a>Collections</a>
          <a className="text-blue-500 py-3 border-b">All smallcases</a>
          <a>Managers</a>
        </div>
        <div className="flex">
          <SortFilter sortFilter={sortFilter} setSortFilter={setSortFilter} />
        </div>
      </div>
      <Hero
        stocks={filteredList}
        filters={filters}
        investmentStrategy={investmentStrategy}
        setFilters={setFilters}
        sortFilter={sortFilter}
      />
    </div>
  );
};

export default DiscoverSection;
