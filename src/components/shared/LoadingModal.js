import React from "react";
import MySpinner from "../layout/MySpinner";
import { Modal } from "react-bootstrap";

export default function LoadingModal({ show }) {
  return (
    <Modal show={show} centered animation={false}>
      
        <MySpinner />
      
    </Modal>
  );
}
