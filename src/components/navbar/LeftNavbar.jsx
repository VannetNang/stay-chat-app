import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { GlobalState } from "../context/GlobalContext";
import MenuClicked from "../overlap/MenuClicked";

const LeftNavbar = () => {
  const { menuClicked, setMenuClicked } = useContext(GlobalState);

  return (
    <>
      <div className="bg-dark-black flex-between px-[1rem] h-[11vh] lg:h-[12vh] lg:px-[2rem]">
        <img
          src={assets.staychat_icon}
          alt="STAYCHAT Logo"
          className="w-[220px]"
        />

        <img
          src={assets.menu_icon}
          alt="Menu Icon"
          width={35}
          className="cursor-pointer hover-dark rounded-full"
          onClick={() => setMenuClicked(!menuClicked)}
        />

        {menuClicked && (
          <div className="absolute bg-black top-0">
            <MenuClicked />
          </div>
        )}  
      </div>
    </>
  );
};

export default LeftNavbar;
