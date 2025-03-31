import StockCard from "./StockCard";

const StockList = ({ stocks, sortFilter }) => {
  return (
    <div className="flex flex-col">
      {stocks.map((stock) => (
        <StockCard key={stock._id} stock={stock} sortFilter={sortFilter} />
      ))}
    </div>
  );
};

export default StockList;
