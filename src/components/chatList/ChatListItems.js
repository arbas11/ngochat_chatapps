import React from "react";
import Avatar from "./Avatar";

function ChatListItems({
  name,
  image,
  status,
  isOnline,
  key,
  animationDelay,
  active,
}) {
  return (
    <div style={{ animationDelay: `0.1` }} className={`chatlist__item`}>
      <Avatar
        image={
          image
            ? image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-9..."
        }
        isOnline={isOnline}
      />

      <div className="userMeta">
        <p>{name}</p>
        <span className="activeTime">{status}</span>
      </div>
    </div>
  );
}

export default ChatListItems;
