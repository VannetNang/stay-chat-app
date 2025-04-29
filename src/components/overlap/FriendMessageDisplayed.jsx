import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalContext";
import { assets } from "../../assets/assets";

const FriendMessageDisplayed = ({ message, convertTimestamp }) => {
  const { chatUser } = useContext(GlobalState);
  return (
    <>
      <div className="flex gap-[12px] items-center lg:gap-[28px]">
        <div className="flex flex-col items-center gap-[6px]">
          <img
            src={chatUser?.userData?.avatar || assets.avatar_icon}
            alt="Avatar Icon"
            className="logo-rounded-mobile lg:logo-rounded"
          />
          <p className="text-xs lg:regular-mobile dark:text-gray">
            {convertTimestamp(message.createdAt)}
          </p>
        </div>

        <div className="max-w-[210px] lg:max-w-[550px] mb-[2.5rem] p-3 friend-message">
          {message.text ? (
            message.text
          ) : (
            <img
              src={message.imageUrl}
              alt="Received Image"
              className="max-w-full rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FriendMessageDisplayed;
