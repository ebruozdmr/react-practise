import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { api } from "../api";

const WRITING_INITIAL = {
  title: "",
  content: "",
};

const WritingForm = () => {
  const [writing, setWriting] = useState(WRITING_INITIAL);
  const [error, setError] = useState("");
  /* Eğer bir bileşen direkt olarak route ile alakalı bilgilere erişemiyorsa, o bileşene route bilgilerini
  enjekte etmek gerekir. */
  /* "react-router-dom" v6 ile birlikte "useHistory" ve "withRouter" yaklaşımları yerine,
    artık "useNavigate" , "useLocation" , "useParams" ve "useMatch" hookları kullanılmaktadır. */
  /* useNavigate hook'u sayesinde ilgili sayfaya yönlendirme yapılır. */
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const handleFormChange = (event) => {
    setWriting({ ...writing, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setWriting(WRITING_INITIAL);
    if (!writing.title || !writing.content) {
      setError("Tüm alanların doldurulması zorunludur!");
      return;
    }
    api()
      .post("/posts", writing)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <>
      {error && (
        <div class="ui form error">
          <div class="ui error message">
            <div class="header">Error</div>
            <p>{error}</p>
          </div>
        </div>
      )}
      <br></br>
      <div className="ui form">
        <div className="field">
          <label>Header</label>
          <input
            type="text"
            onChange={handleFormChange}
            value={writing.title}
            name="title"
          />
        </div>
      </div>
      <br></br>
      <div className="ui form">
        <div className="field">
          <label>Content</label>
          <textarea
            onChange={handleFormChange}
            value={writing.content}
            name="content"
          ></textarea>
        </div>
      </div>
      <br></br>
      <button
        className="ui primary button"
        type="submit"
        onClick={handleFormSubmit}
      >
        Submit
      </button>
      <button className="ui button">Cancel</button>
    </>
  );
};
export default WritingForm;
