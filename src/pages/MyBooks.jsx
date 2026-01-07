import React, { useState, useEffect } from 'react';
import PageWrapper from "../components/PageWrapper";
import BookCard from '../components/BookCard';
import Mosaic from '../components/Mosaic';
import CardButton from "../components/CardButton"

const MyBooks = () => {
    const [books, setBooks] = useState({});

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem("books")) || {};
        setBooks(storedBooks);
    }, []);

    const removeLib = (title) => {
        const updatedBooks = { ...books };
        delete updatedBooks[title];
        setBooks(updatedBooks);
        localStorage.setItem("books", JSON.stringify(updatedBooks));
    };

    const bookList = Object.values(books);

    return (
        <PageWrapper>
            <h2>My Book Library</h2>

            {bookList.length === 0 ? (
                <p>No books in your library. Please add some!</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridAutoRows: 'minmax(320px, auto)',
                        gap: '20px',
                        marginTop: '20px'
                    }}
                >
                    {bookList.map((book) => (
                        <Mosaic key={book.isbn} {...book}>
                            <div
                                style={{
                                    border: '2px solid #ccc',
                                    padding: '15px',
                                    minHeight: '320px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <BookCard {...book} />

                                <CardButton variant="remove" onClick={() => removeLib(book.title)}>
                                    Remove
                                </CardButton>
                            </div>
                        </Mosaic>
                    ))}
                </div>
            )}
        </PageWrapper>
    );
};

export default MyBooks;
