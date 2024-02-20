const CommentList = (props) => {
  console.log(props.comments);
  return (
    <>
      <h3>Comments</h3>
      {props.comments.length > 0 ? (
        <>
          {props.comments.map((item, index) => {
            console.log(item);
            return (
              <div key={index}>
                <div className="ui relaxed list">
                  <div className="item">
                    <div className="content" style={{ visibility: "visible" }}>
                      <span className="header">{item.name}</span>
                      <div className="description">{item.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>No comments available.</div>
      )}
    </>
  );
};
export default CommentList;

