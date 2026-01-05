import React, { useState} from "react";
import styled from "styled-components";

import PageWrapper from "../components/PageWrapper";
import fetchQuery from "../components/fetchQuery";
import BookCard from "../components/BookCard";


const DropDownContent = styled.div`
    display: none;
    position: absolute;
    min-width: 160px;
    z-index: 1;
`;

const DropDownLi = styled.div`
    display: inline-block;
    &:hover ${DropDownContent} {
        display: block;
    }
`;

const Input = styled.input`
    margin-top: 20px;
    margin-left: 20px;
    padding: 2px;
    width: 300px;
    font-size: 16px;
`;



const AddBook = () => {
  const [criteria, setCriteria] = useState("Title");
  const [inputValue, setInputValue] = useState("");
  const [sort, setSort] = useState("relevance");
  const [books , setBooks] = useState([]);

  let myBooks = {}

  const handleSearch = async () => {
    setBooks([])
    const result = await fetchQuery(null, criteria, inputValue, sort)
    setBooks(result || [])
    console.log(books) //// Debugging line
  };

  const addtoLib = (book) => {
    alert("Book added to your library!");
    myBooks = JSON.parse(localStorage.getItem("books")) || {};
    myBooks[book.isbn] = book;
    console.log("myBooks:", myBooks); //// Debugging line
    localStorage.setItem("books", JSON.stringify(myBooks));    
  }

  return (
    <PageWrapper>
      <div>
      <h2>Find Your Books</h2>
      <DropDownLi>
        Search By: {criteria}
        <DropDownContent>
          <div onClick={() => setCriteria("Title")}>Title</div>
          <div onClick={() => setCriteria("Author")}>Author</div>
          <div onClick={() => setCriteria("ISBN")}>ISBN</div>
        </DropDownContent>
      </DropDownLi>
      <DropDownLi style={{marginLeft: '20px'}}>
        Sort By: {sort}
        <DropDownContent>
          <div onClick={() => setSort("relevance")}>relevance</div>
          <div onClick={() => setSort("newest")}>newest</div>
        </DropDownContent>
      </DropDownLi>
      
      <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={`Enter ${criteria}`} />
      <button style={{marginLeft: '10px', padding: '5px 10px'}} onClick={handleSearch}>Search</button>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '20px'}}>
        {books.length > 0 && books.map(book => (
          <div key={book.isbn} style={{border: '1px solid #ccc', margin: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px'}}>
            <BookCard {...book} />
            <button onClick={() => addtoLib(book)}>Add to Library</button>

          </div>
        ))}
      </div>
    </PageWrapper>  
  );
};

export default AddBook;
