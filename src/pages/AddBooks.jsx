import React, { useState } from "react";
import styled from "styled-components";

import fetchQuery from "../components/fetchQuery";
import PageWrapper from "../components/PageWrapper";
import BookCard from "../components/BookCard";
import Mosaic from "../components/Mosaic";
import CardButton from "../components/CardButton";

const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 20px;
`;

const DropDownButton = styled.button`
  padding: 10px 15px;
  background-color: #7f8c8d; 
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #95a5a6;
  }
`;

const DropDownContent = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 180px;
  z-index: 1;
  display: ${(props) => (props.open ? "block" : "none")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const DropDownItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(320px, auto);
  gap: 20px;
  margin-top: 20px;
`;

const AddBook = () => {
  const [criteria, setCriteria] = useState("Title");
  const [inputValue, setInputValue] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [books, setBooks] = useState([]);
  const [searchDropDownOpen, setSearchDropDownOpen] = useState(false);
  const [sortDropDownOpen, setSortDropDownOpen] = useState(false);

  const [addedBooks, setAddedBooks] = useState({});

  let myBooks = {};

  const handleSearch = async () => {
    setBooks([]);
    const result = await fetchQuery(null, criteria, inputValue, sort);
    setBooks(result || []);
  };

  const addtoLib = (book) => {
    if (addedBooks[book.isbn]) return;

    setAddedBooks((prevState) => ({
      ...prevState,
      [book.isbn]: true,
    }));

    myBooks = JSON.parse(localStorage.getItem("books")) || {};
    myBooks[book.isbn] = book;
    localStorage.setItem("books", JSON.stringify(myBooks));
  };

  const toggleSearchDropDown = () => {
    setSearchDropDownOpen(!searchDropDownOpen);
    setSortDropDownOpen(false);
  };
  const toggleSortDropDown = () => {
    setSortDropDownOpen(!sortDropDownOpen);
    setSearchDropDownOpen(false);
  };

  const handleSearchDropDownItemClick = (newCriteria) => {
    setCriteria(newCriteria);
    setSearchDropDownOpen(false);
  };
  const handleSortDropDownItemClick = (newSort) => {
    setSort(newSort);
    setSortDropDownOpen(false);
  };

  return (
    <PageWrapper>
      <Container>
        <Heading>Find Your Books</Heading>
        <SearchWrapper>
          <DropDownWrapper>
            <DropDownButton onClick={toggleSearchDropDown}>
              Search By: {criteria}
            </DropDownButton>
            <DropDownContent open={searchDropDownOpen}>
              <DropDownItem onClick={() => handleSearchDropDownItemClick("Title")}>
                Title
              </DropDownItem>
              <DropDownItem onClick={() => handleSearchDropDownItemClick("Author")}>
                Author
              </DropDownItem>
              <DropDownItem onClick={() => handleSearchDropDownItemClick("ISBN")}>
                ISBN
              </DropDownItem>
            </DropDownContent>
          </DropDownWrapper>

          <DropDownWrapper>
            <DropDownButton onClick={toggleSortDropDown}>
              Sort By: {sort}
            </DropDownButton>
            <DropDownContent open={sortDropDownOpen}>
              <DropDownItem onClick={() => handleSortDropDownItemClick("Relevance")}>
                Relevance
              </DropDownItem>
              <DropDownItem onClick={() => handleSortDropDownItemClick("Newest")}>
                Newest
              </DropDownItem>
            </DropDownContent>
          </DropDownWrapper>

          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${criteria}`}
          />

          <Button onClick={handleSearch}>Search</Button>
        </SearchWrapper>

        <GridWrapper>
          {books.length > 0 &&
            books.map((book) => (
              <Mosaic key={book.isbn} {...book}>
                <div
                  style={{
                    border: "2px solid #ccc",
                    padding: "15px",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <BookCard {...book} />
                  <CardButton variant="add" onClick={() => addtoLib(book)}>
                    {addedBooks[book.isbn] ? "Added! Enjoy Reading!" : "Add to Library"}
                  </CardButton>
                </div>
              </Mosaic>
            ))}
        </GridWrapper>
      </Container>
    </PageWrapper>
  );
};

export default AddBook;
