import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const Comment = (props) => {
  return (
    <>
      <CommentList comments={props.comments}></CommentList>
      <CommentForm
        handleFormSubmit={props.handleFormSubmit}
        error={props.error}
      ></CommentForm>
    </>
  );
};
export default Comment;
