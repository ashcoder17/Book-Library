import { Link } from "react-router-dom";

const BookCard = (book) => {
  return (
    <div className="col-md-4 mb-3">
      <Link to={`/book/${book.isbn}`} style={{ textDecoration: "none" }}>
        <div className="card h-100" style={{border: "2px black"}}>
          <div className="card-header">
            <img src={book.thumbnail} alt='Book Cover'/>
          </div>
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">{book.author}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
