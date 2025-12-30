import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const BookDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <BackButton />
      <h2>Book Details</h2>
      <p>Showing details for Book ID: {id}</p>
    </div>
  );
};

export default BookDetails;
