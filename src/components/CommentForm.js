import { useState } from "react";
const COMMENT_INITIAL = {
  name: "",
  content: "",
};
const CommentForm = (props) => {
  const [comment, setComment] = useState(COMMENT_INITIAL);
  console.log(props);

  const handleOnChange = (event) => {
    setComment({ ...comment, [event.target.name]: event.target.value });
  };

  return (
    <>
      {props.error && (
        <>
          <br></br>
          <div className="ui form error">
            <div className="ui error message">
              <div className="header">Error</div>
              <p>{props.error}</p>
            </div>
          </div>
        </>
      )}
      <h3>Comment</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          props.handleFormSubmit(event, comment);
          setComment(COMMENT_INITIAL);
        }}
      >
        <div className="field">
          <label>Content</label>
          <input
            name="name"
            type="text"
            onChange={handleOnChange}
            value={comment.name}
          />
        </div>
        <div className="field">
          <label>Text</label>
          <textarea
            rows="3"
            name="content"
            type="text"
            onChange={handleOnChange}
            value={comment.content}
          ></textarea>
        </div>
        <button className="ui blue button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
export default CommentForm;
