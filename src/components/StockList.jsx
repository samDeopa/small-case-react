import { useState } from "react";
import StockCard from "./StockCard";

const StockList = ({ stocks, sortFilter }) => {
  const [stockCount, setStockCount] = useState(10);
  return stocks.length ? (
    <div className="flex flex-col mb-10">
      {stocks.slice(0, stockCount).map((stock) => (
        <StockCard key={stock._id} stock={stock} sortFilter={sortFilter} />
      ))}
      {/* Load More Stocks */}
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
  ) : (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">🚀</div>
      <h2 className="text-2xl font-bold mb-2">
        Whoops! The Stocks Have Taken Off!
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        Looks like there are no stocks available right now. Maybe they're on a
        secret mission in space! Check back later for more action.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Refresh
      </button>
    </div>
  );
};

export default StockList;
