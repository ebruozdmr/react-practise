import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";
import UserEditName from "./UserEditName";

const UserEdit = (props) => {
  console.log(props);
  const { id } = useParams();
  const [editedName, setEditedName] = useState({});

  console.log(id);
  useEffect(() => {
    api()
      .get(`/users/${id}`)
      .then((response) => {
        console.log(response.data);
        setEditedName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <UserEditName editedName={editedName} id={id}></UserEditName>;
};

export default UserEdit;
