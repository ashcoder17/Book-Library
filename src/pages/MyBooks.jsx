import React, {useState, useEffect} from 'react';
import PageWrapper from "../components/PageWrapper";
import BookCard from '../components/BookCard';


const MyBooks = () => {
    const [books, setBooks] = useState({});

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem("books")) || {}
        setBooks(storedBooks)
    }, [])

    const removeLib = (isbn) => {
        const updatedBooks = { ...books }
        delete updatedBooks[isbn];
        setBooks(updatedBooks)
        localStorage.setItem("books", JSON.stringify(updatedBooks))
    }


    return (
        <PageWrapper>
            <h2>My Book Library</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {Object.values(JSON.parse(localStorage.getItem("books") || "{}")).length === 0 ? (
                    <p>No books in your library. Please add some!</p>
                ) : 
                (Object.values(JSON.parse(localStorage.getItem("books"))).map(book => (
                    <div key={book.isbn} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
                        <BookCard {...book} />
                        <button onClick={() => removeLib(book.isbn)}>Remove</button>
                    </div>
                    ))
                )}
            </div>
        </PageWrapper>
    );
}

export default MyBooks;
