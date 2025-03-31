const Header = () => {
  return (
    <div className="shadow-md w-full flex justify-center ">
      <div className="  flex justify-between w-[1120px]  py-2 items-center">
        <div className="flex gap-4 items-center">
          <img src="logo.svg" alt="" />
          <button className=" p-1 px-3  mb-0.5 text-sm">Discover </button>
        </div>
        <div className="flex gap-4">
          <a className=" p-2 text-gray-400">Watchlist </a>
          <img
            className="w-10 h-10 rounded-full"
            src="https://avatar.iran.liara.run/public/boy"
            alt="Rounded avatar"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
