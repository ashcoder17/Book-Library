import { Link } from "react-router-dom";

const BookCard = ({ id, title, author, imgsrc }) => {
  return (
    <div className="col-md-4 mb-3">
      <Link to={`/book/${id}`} style={{ textDecoration: "none" }}>
        <div className="card h-100" style={{border: "2px black"}}>
          <div className="card-header">
            <img src={imgsrc} alt='Book Cover'/>
          </div>
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
