import { Link } from "react-router-dom";

const BookCard = ({ id, title, author }) => {
  return (
    <div className="col-md-4 mb-3">
      <Link to={`/book/${id}`} style={{ textDecoration: "none" }}>
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{author}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
