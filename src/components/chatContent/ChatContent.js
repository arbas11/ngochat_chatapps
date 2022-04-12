import React, { useState, useEffect } from "react";

import "./chatContent.scss";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import logo from "../../images/dibimbing.png";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToBottom from "react-scroll-to-bottom";
import { getContactHistory } from "../../service/history";

function ChatContent({
  token,
  userData,
  userEmail,
  selectedContact,
  contactSelected,
  socket,
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRecMsg, setCurrentRecMsg] = useState({});
  const [messageHist, setMessageHist] = useState([]);
  const [currentContactEmail, setCurrentContactEmail] = useState("");

  const [loading] = useState(true);
  const [hasMore] = useState(false);

  const [sendMsg] = useState(0);

  useEffect(() => {
    setMessageHist([]);
  }, [selectedContact]);

  const getHistory = async (userEmail, contactEmail, token) => {
    const history = await getContactHistory(userEmail, contactEmail, token);
    setMessageHist(history.data);
  };

  useEffect(() => {
    if (contactSelected && selectedContact) {
      getHistory(userEmail, selectedContact.contactEmail, token);
      setCurrentContactEmail(selectedContact.contactEmail);
    }
  }, [contactSelected, selectedContact, sendMsg, token, userEmail]);

  const time = () => {
    const date = new Date();
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    currentHours = ("0" + currentHours).slice(-2);
    currentMinutes = ("0" + currentMinutes).slice(-2);
    return currentHours + ":" + currentMinutes;
  };

  const capitalise = (msg) => {
    const firstLetter = msg[0].toUpperCase();
    return firstLetter + msg.slice(1);
  };

  const getMessage = (e) => {
    setCurrentMessage(e.target.value);
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setCurrentRecMsg(data);
    });
  }, [socket]);

  useEffect(() => {
    if (currentRecMsg.author === currentContactEmail) {
      setMessageHist((prev) => [...prev, currentRecMsg]);
    }
  }, [currentRecMsg, currentContactEmail]);

  const sendMessage = async () => {
    if (currentMessage !== "" && currentMessage !== " ") {
      const capsMsg = capitalise(currentMessage);
      const messageData = {
        owner: userEmail,
        contact: selectedContact.contactEmail,
        author: userEmail,
        recepient: selectedContact.contactEmail,
        message: capsMsg,
        time: time(),
      };
      await socket.emit("send-message", messageData);
      setMessageHist([...messageHist, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        {contactSelected ? (
          <>
            <div className="blocks">
              <div className="current-chatting-user">
                <Avatar
                  isOnline={
                    selectedContact.contactData.isOnline ? "active" : ""
                  }
                  image={selectedContact.contactData.profilePic}
                />
                <p>
                  {selectedContact.contactName
                    ? selectedContact.contactName
                    : selectedContact.contactData.displayName}
                </p>
              </div>
            </div>

            <div className="blocks">
              <div className="settings">
                <button className="btn-nobg">
                  <i className="fa fa-cog"></i>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="chat-content-logo">
            <img src={logo} alt="logo dibimbing"></img>
          </div>
        )}
      </div>
      {contactSelected && (
        <div className="content__body">
          <div className="chat__items">
            {/*Put the scroll bar always on the bottom*/}
            <div
              id="scrollableDiv"
              style={{
                height: 300,
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <InfiniteScroll
                dataLength={messageHist.length}
                next={() => {
                  console.log("next");
                }}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                inverse={true}
                hasMore={hasMore}
                loader={loading && <h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                <ScrollToBottom>
                  <ChatItem
                    sendMsg={sendMsg}
                    userEmail={userEmail}
                    selectedContact={selectedContact}
                    contactEmail={selectedContact.contactEmail}
                    contactName={selectedContact.contactName}
                    animationDelay={0 + 1}
                    history={messageHist}
                    setMessageHist={setMessageHist}
                    contactImage={selectedContact.contactData.profilePic}
                    userImage={userData.profilePic}
                  />
                </ScrollToBottom>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}

      {contactSelected && (
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={getMessage}
              value={currentMessage}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button
              className="btnSendMsg"
              id="sendMsgBtn"
              onClick={sendMessage}
            >
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContent;
