import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { GlobalState } from "../context/GlobalContext";
import { logoutAccount } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const MenuClicked = () => {
  const navigate = useNavigate();
  const {
    setWelcomeChat,
    setOpenChat,
    setProfileDetail,
    setMenuClicked,
    darkMode,
    toggleDarkMode,
    setDarkMode,
  } = useContext(GlobalState);

  function handleLogoutClicked() {
    logoutAccount();
    setMenuClicked(false);
  }

  return (
    <>
      <div className="w-[350px] h-[220px] flex justify-center flex-col text-gray px-[2rem] gap-[2rem] regular">
        <div
          className="flex items-center gap-[1rem] cursor-pointer hover-text"
          onClick={() => {
            navigate("/edit-profile");
            setMenuClicked(false);
          }}
        >
          <img src={assets.avatar_icon} className="w-[35px]" />
          <p>Edit Profile</p>
        </div>

        <div
          className="flex items-center gap-[1rem] cursor-pointer hover-text"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <>
              <img src={assets.dark_icon} className="w-[35px] invert" />
              <p>Dark Mode</p>
            </>
          ) : (
            <>
              <img src={assets.light_icon} className="w-[35px]" />
              <p>Light Mode</p>
            </>
          )}
        </div>

        <div
          className="flex items-center gap-[1rem] cursor-pointer hover-text"
          onClick={handleLogoutClicked}
        >
          <img src={assets.logout_icon} className="w-[35px] invert" />
          <p>Logout</p>
        </div>
      </div>
    </>
  );
};

export default MenuClicked;
