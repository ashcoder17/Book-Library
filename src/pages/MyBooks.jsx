import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PageWrapper from "../components/PageWrapper";
import BookCard from "../components/BookCard";
import BookGrid from "../components/BookGrid";
import CardButton from "../components/CardButton";
import withLoadingAnimation from "../components/hoc/withLoadingAnimation";
import withImageLoading from "../components/hoc/withImageLoading";
import SidePanel from "../components/SidePanel";
import fetchBookDetails from "../components/fetchBookDetails";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const Container = styled.div`
  margin: 40px auto;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg, #ff416c, #ff4b2b, #ffe259);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${shine} 3s linear infinite;
  text-align: center;
`;

const RemoveWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: #fff;
  box-shadow: 0 6px 20px rgba(255, 65, 108, 0.5);
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255, 65, 108, 0.6);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
    transform: none;
    box-shadow: none;
  }
`;

const NoBooks = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 40px;
`;

const BookGridWithLoading = withLoadingAnimation(BookGrid);

const MyBooks = () => {
    const [books, setBooks] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [panelLoading, setPanelLoading] = useState(false);

    const bookList = Object.values(books);
    const pageSize = 24;
    const totalPages = Math.ceil(bookList.length / pageSize);

    useEffect(() => {
        setLoading(true);
        const storedBooks = JSON.parse(localStorage.getItem("books")) || {};
        setTimeout(() => {
            setBooks(storedBooks);
            setLoading(false);
        }, 800);
    }, []);

    const handleBookClick = async (book) => {
        setPanelLoading(true);
        setSelectedBook(book);
        const detailedBook = await fetchBookDetails(book);
        setSelectedBook(detailedBook);
        setPanelLoading(false);
    };

    const addToLib = (book) => {
        setBooks((prev) => ({ ...prev, [book.title]: book }));
        const myBooks = JSON.parse(localStorage.getItem("books")) || {};
        myBooks[book.title] = book;
        localStorage.setItem("books", JSON.stringify(myBooks));
    };

    const removeFromLib = (title) => {
        setBooks((prev) => {
            const updated = { ...prev };
            delete updated[title];
            return updated;
        });
        const myBooks = JSON.parse(localStorage.getItem("books")) || {};
        delete myBooks[title];
        localStorage.setItem("books", JSON.stringify(myBooks));
    };

    // Wrap BookCard with image loading HOC
    const BookCardWithImageLoading = (props) => {
        const ImageWithLoading = withImageLoading(({ src, alt }) => (
            <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
        ));
        return <BookCard {...props} ImageComponent={ImageWithLoading} />;
    };

    return (
        <PageWrapper>
            <Container>
                <Heading>My Book Library</Heading>

                {bookList.length === 0 && !loading ? (
                    <NoBooks>No books in your library. Please add some!</NoBooks>
                ) : (
                    <>
                        <BookGridWithLoading loading={loading}>
                            {bookList
                                .slice((page - 1) * pageSize, page * pageSize)
                                .map((book) => (
                                    <div key={book.id}>
                                        <BookCardWithImageLoading {...book} onClick={() => handleBookClick(book)} />
                                        <RemoveWrapper>
                                            <CardButton
                                                variant="remove"
                                                onClick={() => removeFromLib(book.title)}
                                            >
                                                Remove
                                            </CardButton>
                                        </RemoveWrapper>
                                    </div>
                                ))}
                        </BookGridWithLoading>

                        {totalPages > 1 && (
                            <PaginationWrapper>
                                {page > 1 && (
                                    <PaginationButton onClick={() => setPage(page - 1)}>{"<"}</PaginationButton>
                                )}

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <PaginationButton
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        disabled={page === i + 1}
                                    >
                                        {i + 1}
                                    </PaginationButton>
                                ))}

                                {page < totalPages && (
                                    <PaginationButton onClick={() => setPage(page + 1)}>{" > "}</PaginationButton>
                                )}
                            </PaginationWrapper>
                        )}
                    </>
                )}
            </Container>

            <SidePanel
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
                inLibrary={!!selectedBook && !!books[selectedBook.title]}
                onAdd={addToLib}
                onRemove={removeFromLib}
            />
        </PageWrapper>
    );
};

export default MyBooks;
