import React, { useState, useEffect } from 'react';
import PageWrapper from "../components/PageWrapper";
import BookCard from '../components/BookCard';
import Mosaic from '../components/Mosaic';
import CardButton from "../components/CardButton"
import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(320px, auto);
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const MyBooks = () => {
    const [books, setBooks] = useState({});
    const [page, setPage] = useState(1);
    const bookList = Object.values(books);
    const totalSize = bookList.length;
    const totalPages = Math.ceil(totalSize / 15);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem("books")) || {};
        setBooks(storedBooks);
    }, []);

    const removeLib = (isbn) => {
        const updatedBooks = { ...books };
        delete updatedBooks[isbn];
        setBooks(updatedBooks);
        localStorage.setItem("books", JSON.stringify(updatedBooks));
    };


    return (
        <PageWrapper>
            <h2>My Book Library</h2>
            <GridWrapper>
                {bookList.length === 0 ? (
                    <p>No books in your library. Please add some!</p>
                ) : (
                    bookList
                        .slice((page - 1) * 15, page * 15)
                        .map((book) => (
                            <Mosaic key={book.isbn} {...book}>
                                <div
                                    style={{
                                        border: '2px solid #ccc',
                                        padding: '15px',
                                        minHeight: '320px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <BookCard {...book} />
                                    <CardButton variant="remove" onClick={() => removeLib(book.isbn)}>
                                        Remove
                                    </CardButton>
                                </div>
                            </Mosaic>
                        ))
                )}
            </GridWrapper>

            {books.length > 0 && totalPages > 1 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                >
                    <div>
                        {page > 1 && (
                            <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                                {"<"}
                            </Button>
                        )}

                        {totalPages > 1 &&
                            Array.from({ length: totalPages }, (_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setPage(index + 1)}
                                    style={{ margin: "5px" }}
                                >
                                    {index + 1}
                                </Button>
                            ))}

                        {page < totalPages && (
                            <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                                {">"}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </PageWrapper>
    );
};

export default MyBooks;
