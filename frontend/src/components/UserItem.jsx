import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserItem({ user }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="note">
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>{user.email}</p>

      <Button variant="primary" onClick={handleShow} className="view">
        View
      </Button>

      <Modal show={show} onHide={handleClose} user={user}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> First Name: {user.firstName}</p>
          <p> First Name: {user.lastName}</p>
          <p> First Name: {user.email}</p>
          <p> First Name: {user.dateOfBirth}</p>
          <p> First Name: {user.mobile}</p>
          <p> First Name: {user.status}</p>
          <p> First Name: {user.accountType}</p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
export default UserItem;
