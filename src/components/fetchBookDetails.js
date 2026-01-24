
import axios from "axios";

const fetchBookDetails = async (book) => {
  try {
    console.log("Fetching details for book:", book);
    const workKey = book.id
    const res = await axios.get(`https://openlibrary.org${workKey}.json`);
    const rawDesc = res.data.description;

    const desc =
      typeof rawDesc === "string"
        ? rawDesc
        : rawDesc?.value || "No description available.";


    book.description = desc;
    return book;
  } catch (err) {
    console.error("Book details fetch failed", err);
    return book;
  }
};

export default fetchBookDetails;
