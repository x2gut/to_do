import "./loadMoreBtn.css"

function LoadMoreBtn( {onClick} ) {
  return (
    <>
      <button className="load-more" onClick={onClick}>Load More</button>
    </>
  );
}

export default LoadMoreBtn;
