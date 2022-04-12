import React, { useState } from "react";
import { updateIsLogout } from "../../service/auth";
import { deleteContact, updateContactData } from "../../service/contact";
import { getUserByEmail, updateUserData } from "../../service/user";
import AlertModal from "../alertModal/AlertModal";
import UpdateModal from "../updateModal/UpdateModal";
import "./userProfile.scss";

function UserProfile({
  token,
  userData,
  setUserData,
  setIsAuth,
  selectedContact,
  setSelectedContact,
  contactSelected,
  setContactSelected,
}) {
  const [toggeOpen, setToggleOpen] = useState(false);
  const [error, setError] = useState(false);
  const [openAlertDeleteModal, setOpenAlertDeleteModal] = useState(false);

  const [whatToUpdate, setWhatToUpdate] = useState("");
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [userNewDisplayName, setUserNewDisplayName] = useState("");
  const [userNewProfilePic, setUserNewProfilePic] = useState("");
  const [userNewStatus, setUserNewStatus] = useState("");

  const [updateContactModal, setUdpateContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState("");

  const handleUserUpdate = async () => {
    await updateUserData(
      userData.userEmail,
      userNewDisplayName,
      userNewProfilePic,
      userNewStatus,
      token
    );
    const newUserData = await getUserByEmail(userData.userEmail, token);
    setUserData(newUserData);
    setUpdateUserModal(false);
    setUserNewProfilePic("");
    setUserNewDisplayName("");
    setUserNewStatus("");
  };

  const handleContactUpdate = async () => {
    const newContactData = await updateContactData(
      userData.userEmail,
      selectedContact.contactEmail,
      newContactName,
      token
    );
    setSelectedContact(newContactData);
    setUdpateContactModal(false);
    setNewContactName("");
    setContactSelected(false);
  };

  const toggleInfo = (e) => {
    setToggleOpen(!toggeOpen);
  };

  const handleDelete = (userEmail, contactEmail, userId) => {
    deleteContact(userEmail, contactEmail, userId, token)
      .then(function (response) {
        setError(false);
        setTimeout(() => {
          setContactSelected(false);
        }, 2000);
      })
      .catch(function (error) {
        if (error) {
          setError(true);
        }
      });
    setOpenAlertDeleteModal(true);
  };

  const handleLogout = async () => {
    window.sessionStorage.removeItem("auth");
    setIsAuth(false);
    await updateIsLogout(userData.userEmail, token);
  };
  return (
    <div className="main__userprofile">
      {/*update contact modal*/}
      <UpdateModal
        whatToUpdate={whatToUpdate}
        openModal={updateContactModal}
        setOpenModal={setUdpateContactModal}
        firstValue={newContactName}
        setFirstValue={setNewContactName}
        handleFunction={handleContactUpdate}
        data={{
          tittle: "contact",
          first: "contact name",
        }}
      />
      {/*update user modal*/}
      <UpdateModal
        whatToUpdate={whatToUpdate}
        openModal={updateUserModal}
        setOpenModal={setUpdateUserModal}
        firstValue={userNewDisplayName}
        setFirstValue={setUserNewDisplayName}
        secondValue={userNewProfilePic}
        setSecondValue={setUserNewProfilePic}
        thirdValue={userNewStatus}
        setThirdValue={setUserNewStatus}
        handleFunction={handleUserUpdate}
        data={{
          tittle: "user",
          first: "display name",
          second: "profile picture",
          third: "update status",
        }}
      />
      <div
        className="profile__card user__profile__image"
        onClick={
          contactSelected
            ? () => {
                setNewContactName(selectedContact.contactName);
                setWhatToUpdate("contact");
                setUdpateContactModal(true);
              }
            : () => {
                setUserNewProfilePic(userData.profilePic);
                setUserNewDisplayName(userData.displayName);
                setUserNewStatus(userData.status);
                setWhatToUpdate("user");
                setUpdateUserModal(true);
              }
        }
      >
        <div className="profile__image">
          <img
            src={
              contactSelected
                ? selectedContact.contactData.profilePic
                : userData.profilePic
            }
            alt="profile"
          />
        </div>
        <h4>
          {contactSelected
            ? selectedContact.contactData.displayName
            : userData.displayName}
        </h4>
        <p>
          {contactSelected
            ? selectedContact.contactData.status
            : userData.status}
        </p>
      </div>
      <div className={toggeOpen ? "profile__card open" : "profile__card"}>
        <div className="card__header" onClick={toggleInfo}>
          <h4>Information</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">
          <div>Email:</div>
          <div>
            {contactSelected
              ? selectedContact.contactEmail
              : userData.userEmail}
          </div>
        </div>
        <div className="card__content">
          <div>status:</div>
          <div>
            {contactSelected
              ? selectedContact.contactData.status
              : userData.status}
          </div>
        </div>
        {contactSelected ? (
          <>
            <div
              onClick={() =>
                handleDelete(
                  userData.userEmail,
                  selectedContact.contactEmail,
                  selectedContact._id,
                  token
                )
              }
              className="card__content delete-contact"
            >
              <div>delete contact</div>
              <AlertModal
                openAlertModal={openAlertDeleteModal}
                setOpenAlertModal={setOpenAlertDeleteModal}
                message={
                  error
                    ? "Something went wrong, please try again"
                    : "successfully delete contact!"
                }
                data={{
                  name: selectedContact.contactName,
                  number: selectedContact.contactEmail,
                  tittle: "delete",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() =>
                handleLogout(userData.userEmail, selectedContact._id, token)
              }
              className="card__content delete-contact"
            >
              <div>log out</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default UserProfile;
