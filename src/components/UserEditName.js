import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const USER_NAME_INITIAL = {
  name: "",
};
const UserEditName = (props) => {
  const [userName, setUserName] = useState(USER_NAME_INITIAL);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(props);
  console.log(id);

  const handleOnChange = (event) => {
    setUserName({ ...userName, [event.target.name]: event.target.value });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setUserName(USER_NAME_INITIAL);
    setError("");
    if (!userName.name) {
      setError("Please fill the user name field!");
      return;
    }
    api()
      .put(`/users/${id}`, userName)
      .then((response) => {
        console.log(response.data);
        navigate(`/users/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  useEffect(() => {
    if (props.editedName?.name)
      setUserName({
        name: props.editedName.name,
      });
  }, [props.editedName]);
  console.log(userName);
  return (
    <>
      {error && (
        <div className="ui form error">
          <div className="ui error message">
            <div className="header">Error</div>
            <p>{error}</p>
          </div>
        </div>
      )}
      <h3>User</h3>
      <form className="ui form" onSubmit={handleOnSubmit}>
        <div className="field">
          <label>User Name</label>
          <input
            name="name"
            type="text"
            onChange={handleOnChange}
            value={userName.name}
          />
        </div>

        <button className="ui blue button" type="submit">
          Submit
        </button>
        <button className="ui gray button" type="submit">
          Cancel
        </button>
      </form>
    </>
  );
};
export default UserEditName;
