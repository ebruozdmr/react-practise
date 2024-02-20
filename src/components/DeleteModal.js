import { useState } from "react";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const DeleteModal = ({ details }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const showModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  console.log(id);
  console.log(details);

  const handleDelete = (id) => {
    console.log(id);
    api()
      .delete(`/users/${id}`)
      .then((response) => {
        console.log(response);
        setError("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  return (
    <>
      <Button size="mini" color="red" onClick={showModal}>
        Delete
      </Button>
      <Modal size="mini" open={open} onClose={closeModal}>
        <ModalHeader>Deleting Process</ModalHeader>
        <ModalContent>
          <p>
            Are you sure you want to delete <b>{details.name}</b> user?
          </p>
          {error && <p>{error}</p>}
        </ModalContent>
        <ModalActions>
          <Button negative onClick={closeModal}>
            No
          </Button>
          <Button positive onClick={() => handleDelete(id)}>
            Yes
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default DeleteModal;
