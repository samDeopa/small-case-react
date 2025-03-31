import SideFilters from "./SideFilters";
import StockList from "./StockList";

const Hero = ({
  stocks,
  filters,
  setFilters,
  investmentStrategy,
  sortFilter,
}) => {
  return (
    <div className="flex gap-10 ">
      <div className="w-1.2/6">
        <SideFilters
          filters={filters}
          setFilters={setFilters}
          investmentStrategy={investmentStrategy}
        />
      </div>
      <div className="w-4.8/6">
        <StockList stocks={stocks} sortFilter={sortFilter} />
      </div>
    </div>
  );
};
export default Hero;
