import BookCard from '../components/BookCard';
import withLoading from '../HOC/withLoading';
import useFetchBooks from '../hooks/useFetchBooks';
import PageWrapper from "../components/PageWrapper";

const BookList = ({ books }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {books.map(book => <BookCard key={book.id} book={book} />)}
  </div>
);

// Wrap the list with the Loading HOC
const BookListWithLoading = withLoading(BookList);

const AllBooks = () => {
  const { data, loading } = useFetchBooks('/books.json');

  return (
    <PageWrapper>
      <h2>Library Catalog</h2>
      <BookListWithLoading isLoading={loading} books={data} />
    </PageWrapper>
  );
};

export default withLoading(AllBooks);