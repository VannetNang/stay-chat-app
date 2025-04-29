import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalContext";
import { assets } from "../../assets/assets";

const YourMessageDisplayed = ({ message, convertTimestamp }) => {
  const { userData } = useContext(GlobalState);
  return (
    <>
      <div className="flex items-center justify-end gap-[12px] lg:gap-[28px]">
        <div className="max-w-[210px] lg:max-w-[550px] mb-[2.5rem] p-3 your-message">
          {message.text ? (
            message.text
          ) : (
            <img
              src={message.imageUrl}
              alt="Sent Image"
              className="max-w-full rounded-lg"
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-[6px]">
          <img
            src={userData?.avatar || assets.avatar_icon}
            alt="Avatar Icon"
            className="logo-rounded-mobile lg:logo-rounded"
          />
          <p className="text-xs lg:regular-mobile dark:text-gray">
            {convertTimestamp(message.createdAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default YourMessageDisplayed;
