// src/pages/AllBooks.js
import BookCard from '../components/Books/BookCard';
import withLoading from '../components/HOC/withLoading';
import useFetchBooks from '../hooks/useFetchBooks';

const BookList = ({ books }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {books.map(book => <BookCard key={book.id} book={book} />)}
  </div>
);

// Wrap the list with the Loading HOC
const BookListWithLoading = withLoading(BookList);

const AllBooks = () => {
  const { data, loading } = useFetchBooks('/books.json'); // Fetching from public/books.json

  return (
    <div>
      <h2>Library Catalog</h2>
      <BookListWithLoading isLoading={loading} books={data} />
    </div>
  );
};

export default AllBooks;