import BookCard from '../components/BookCard';
import withLoading from '../HOC/withLoading';
import useFetchBooks from '../hooks/useFetchBooks';
import PageWrapper from "../components/PageWrapper";

const BookList = ({ books }) => (
  <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-evenly' }}>
    {console.log(books)}
    {books.map(book => <BookCard key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors?.join(', ')} imgsrc={book.volumeInfo.imageLinks.smallThumbnail}/>)}
  </div>
);

// Wrap the list with the Loading HOC
const BookListWithLoading = withLoading(BookList);

const AllBooks = () => {
  const { data, loading } = useFetchBooks('https://www.googleapis.com/books/v1/volumes?q=harry+potter');

  return (
    <PageWrapper>
      <h2>Library Catalog</h2>
      <BookListWithLoading isLoading={loading} books={data.items} />
    </PageWrapper>
  );
};

export default withLoading(AllBooks);