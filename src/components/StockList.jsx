import { useState } from "react";
import StockCard from "./StockCard";

const StockList = ({ stocks, sortFilter }) => {
  const [stockCount, setStockCount] = useState(10);
  return (
    <div className="flex flex-col mb-10">
      {stocks.slice(0, stockCount).map((stock) => (
        <StockCard key={stock._id} stock={stock} sortFilter={sortFilter} />
      ))}
      <div className="py-2 border-y-1 border-[#dde0e4]">
        <button
          className="w-[100%] py-5 text-blue-500  hover:bg-gray-200 rounded "
          onClick={() => {
            if (stockCount < stocks.length) setStockCount(stockCount + 10);
          }}
        >
          Load more smallcases
        </button>
      </div>
    </div>
  );
};

export default StockList;
