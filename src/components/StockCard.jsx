import React from "react";

const StockCard = ({ stock, sortFilter }) => {
  let cagrValue;
  let cagrDuration;
  if (sortFilter?.startsWith("1M")) {
    cagrValue = stock.stats?.returns.monthly;
    cagrDuration = "1M Returns";
  } else if (sortFilter?.startsWith("6M")) {
    cagrValue = stock.stats?.returns.halfyearly;
    cagrDuration = "6M Returns";
  } else if (sortFilter?.startsWith("1Y")) {
    cagrValue = stock.stats.ratios?.cagr1y;
    cagrDuration = "1Y CAGR";
  } else if (sortFilter?.startsWith("3Y")) {
    cagrValue = stock.stats.ratios?.cagr3y;
    cagrDuration = "3Y CAGR";
  } else if (sortFilter?.startsWith("5Y")) {
    cagrValue = stock.stats.ratios?.cagr5y;
    cagrDuration = "5Y CAGR";
  }
  if (!cagrValue) {
    cagrValue = stock.platformData?.ratios?.cagr;
    cagrDuration = stock.platformData?.ratios?.cagrDuration;
  }

  const formattedCagr = ((cagrValue || 0) * 100).toFixed(2);

  if (!stock) return null;

  return (
    <div className="flex  justify-between items-center px-2 py-6 border-1 border-white border-b-gray-200  gap-4 bg-white  hover:shadow-md hover:border-1 hover:border-gray-200 hover:rounded ">
      <div className="flex items-start">
        <img
          src={`https://assets.smallcase.com/images/smallcases/200/${stock?.scid}.png`}
          alt={stock.info?.name || "Stock Logo"}
          className="h-16 w-16 rounded-md object-cover"
        />
        <div className="ml-4 flex flex-col gap-2">
          <h2 className="text-xl font-[590] text-gray-800 max-w-[277px] truncate ">
            {stock.info?.name}
          </h2>
          <p className="text-[15px] w-[352px] text-gray-500">
            {stock.info?.shortDescription}
          </p>
          <p className="text-[15px] text-gray-400">
            by {stock.info?.publisherName}
          </p>
        </div>
      </div>

      <div className="flex items-center  space-x-10">
        <div className="">
          <p className="text-sm text-gray-500">Min. Amount</p>
          <p className=" font-bold text-gray-800">
            ${" "}
            {new Intl.NumberFormat("en-IN").format(
              stock.stats?.minInvestAmount || 0
            )}
          </p>
        </div>

        <div className="">
          <p className="text-sm text-gray-500">{cagrDuration}</p>
          <p className=" font-medium text-green-600">{formattedCagr}%</p>
        </div>

        <div>
          <p className="px-2 py-1 text-sm border border-gray-300 rounded text-gray-700">
            {stock.stats?.ratios?.riskLabel === "Medium Volatility"
              ? "Med. Volatility"
              : stock.stats?.ratios?.riskLabel}
          </p>
        </div>
        <div>
          <i className="fa-solid fa-bookmark"></i>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
