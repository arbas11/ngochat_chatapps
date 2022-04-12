import React, { useEffect, useState } from "react";
import "../../styles/bootstrap.scss";
import "./chatList.scss";

import { getUserAllContactData } from "../../service/contact";

import ChatListItems from "./ChatListItems";
import NewContactModal from "../NewContactModal/NewContactModal";
import AlertModal from "../alertModal/AlertModal";

function ChatList({
  token,
  userEmail,
  contactSelected,
  setContactSelected,
  setSelectedContact,
}) {
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [modalAddSuccess, setModalAddSuccess] = useState(false);
  const [contactAddData, setContactAddData] = useState({});

  const getContacts = async (userNum, token) => {
    const data = await getUserAllContactData(userNum, token);
    setAllContacts(data);
  };
  useEffect(() => {
    if (userEmail) {
      getContacts(userEmail, token);
    }
  }, [userEmail, openNewContactModal, contactSelected, token]);

  return (
    <div className="main__chatlist">
      <button onClick={() => setOpenNewContactModal(true)} className="btn">
        <i className="fa fa-plus"></i>
        <span>Add new contact</span>
      </button>
      <NewContactModal
        openNewContactModal={openNewContactModal}
        setOpenNewContactModal={setOpenNewContactModal}
        userEmail={userEmail}
        token={token}
        setContactAddData={setContactAddData}
        setModalAddSuccess={setModalAddSuccess}
      />
      <AlertModal
        openAlertModal={modalAddSuccess}
        setOpenAlertModal={setModalAddSuccess}
        message={"contact added"}
        data={{
          name: contactAddData.name,
          number: contactAddData.number,
          tittle: "update",
        }}
      />
      <div className="chatlist__heading">
        <h2>Contacts</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input
            type="text"
            placeholder="Search Here"
            required
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {allContacts &&
          allContacts
            .filter((v) => {
              if (searchTerm === "") {
                return v;
              } else {
                return v.contactName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              }
            })
            .map((v, index) => (
              <div key={index}>
                <div
                  onClick={() => {
                    setContactSelected(true);
                    setSelectedContact(v);
                  }}
                >
                  <ChatListItems
                    index={index}
                    name={
                      v.contactName ? v.contactName : v.contactData.displayName
                    }
                    image={v.contactData.profilePic}
                    status={v.contactData.status}
                    animationDelay={0 + 1}
                    active={false ? "active" : ""}
                    isOnline={v.contactData.isOnline ? "active" : ""}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
export default ChatList;
