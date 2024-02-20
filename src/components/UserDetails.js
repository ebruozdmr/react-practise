import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import { api } from "../api";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const UserDetails = () => {
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const location = useLocation();

  console.log(id); //params
  console.log(location); //path

  useEffect(() => {
    // axios
    //   .all([
    //     axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
    //     axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
    //   ])
    //   .then((responses) => {
    //     console.log(responses);
    //     setDetails(responses[0].data);
    //     setComments(responses[1].data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    api()
      .get(`/users/${id}`)
      .then((response) => {
        console.log(response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api()
      .get(`/posts/${id}/comments`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (event, comment) => {
    event.preventDefault();
    setError("");
    if (!comment.content || !comment.name) {
      setError("Tüm alanların doldurulması zorunludur!");
      return;
    }
    api()
      .post("/posts", comment)
      .then((response) => {
        console.log(response.data);
        setComments([...comments, response.data]);
      })
      .catch((error) => {
        console.log({ error });
        setError(error);
      });
  };

  return (
    <div className="ui relaxed divided list">
      <div className="item">
        <i className="large github middle aligned icon"></i>
        <div className="content">
          <h2 className="header">{details.name}</h2>
          <div className="description">{details.username}</div>
          <div className="description">{details.email}</div>
          <div className="description">{details.phone}</div>
          <br></br>
          <div className="ui buttons">
            <Link to={`/users/${id}/edit`} className="ui blue button">
              Düzenle
            </Link>
            <DeleteModal details={details}></DeleteModal>
          </div>
        </div>
      </div>
      <Comment
        comments={comments}
        handleFormSubmit={handleFormSubmit}
        error={error}
      ></Comment>
    </div>
  );
};
export default UserDetails;
