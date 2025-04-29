import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalContext";
import { assets } from "../../assets/assets";

const RightNavbar = () => {
  const { setOpenChat, setProfileDetail, setWelcomeChat, chatUser } =
    useContext(GlobalState);

  function handleProfileDetail() {
    setProfileDetail(true);
    setOpenChat(false);
    setWelcomeChat(false);
  }

  function handleClosing() {
    setOpenChat(false);
    setProfileDetail(false);
    setWelcomeChat(true);
  }

  return (
    <>
      <div className="h-[70px] lg:h-[105px] bg-dark-black flex flex-between text-gray px-[2rem] heading-mobile">
        <p
          className="regular-mobile lg:heading-mobile hover-text cursor-pointer"
          onClick={handleClosing}
        >
          Close
        </p>
        <div
          className="regular-mobile lg:heading-mobile hover-text cursor-pointer flex gap-1.5 lg:gap-0"
          onClick={handleProfileDetail}
        >
          {chatUser.userData.name}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img src={assets.green_dot} className="rounded-full lg:w-[26px]" />
          ) : null}
        </div>
        <img
          src={chatUser.userData.avatar}
          alt="Avatar Icon"
          className="w-[45px] h-[45px] rounded-full lg:logo-rounded cursor-pointer"
          onClick={handleProfileDetail}
        />
      </div>
    </>
  );
};

export default RightNavbar;
