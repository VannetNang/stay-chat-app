import React, { useContext } from "react";
import MediaDisplayed from "../component/MediaDisplayed";
import { assets } from "../../assets/assets";
import { GlobalState } from "../context/GlobalContext";

const ProfileDetail = () => {
  const { setOpenChat, setWelcomeChat, setProfileDetail, chatUser } =
    useContext(GlobalState);

  function handleProfileDetailClick() {
    setWelcomeChat(false);
    setProfileDetail(false);
    setOpenChat(true);
  }
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="px-[1rem] lg:px-[2rem]">
          <div
            className="heading-mobile lg:heading mt-[1.5rem] cursor-pointer hover-text dark:text-gray flex items-center gap-2"
            onClick={handleProfileDetailClick}
          >
            <img src={assets.arrow_icon} className="w-[25px]" />
            Back
          </div>

          <div className="flex-center flex-col gap-[1rem] mb-[20px] lg:gap-[24px] lg:mb-[44px]">
            <img
              src={chatUser.userData.avatar || assets.avatar_icon}
              alt="Avatar Icon"
              className="w-[180px] lg:w-[250px] rounded-md"
            />
            <p className="text-[20px] lg:text-[24px] mt-[1rem] dark:text-gray">
              <span className="underline">Name</span>: {chatUser.userData.name}
            </p>
            <p className="text-[15px] lg:text-[20px] dark:text-gray">
              <span className="underline">Bio</span>: {chatUser.userData.bio}
            </p>
          </div>
        </div>

        <section className="flex-1 max-h-[51vh] lg:max-h-[75vh] overflow-y-scroll no-scrollbar">
          <MediaDisplayed />
        </section>
      </div>
    </>
  );
};

export default ProfileDetail;
