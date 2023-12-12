import React, { useContext, useState } from "react";

import Toast from "react-bootstrap/Toast";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import { timeSince } from "../../shared/utils/getTimeSince";

import MessageModal from "../shared/MessageModal";

import "./Review.css";

function Review({ avatar, content, username, date, id, creatorId, onTrigger }) {
  const auth = useContext(AuthContext);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const reviewDeleteHandler = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/reviews/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      onTrigger();
    } catch (err) {}
  };

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };
  return (
    <>
      <Toast className="review-custom" onClose={() => toggleConfirmDelete()}>
        <Toast.Header
          className="review-header"
          closeButton={auth.userId === creatorId}
        >
          <img src={avatar} className="rounded me-2" alt="avatar" />
          <strong className="me-auto mx-2">{username}</strong>
          <small>{timeSince(date)}</small>
        </Toast.Header>
        <Toast.Body className="review-body">{content}</Toast.Body>
      </Toast>
      <MessageModal
        mes={"Are you sure to delete this post?"}
        show={confirmDelete}
        onClear={toggleConfirmDelete}
        handler={() => {
          reviewDeleteHandler();
          toggleConfirmDelete();
        }}
      />
    </>
  );
}

export default Review;
