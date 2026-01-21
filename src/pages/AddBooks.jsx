import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import fetchQuery from "../components/fetchQuery";
import PageWrapper from "../components/PageWrapper";
import BookCard from "../components/BookCard";
import CardButton from "../components/CardButton";
import BookGrid from "../components/BookGrid";

import withLoadingAnimation from "../components/hoc/withLoadingAnimation";
import withImageLoading from "../components/hoc/withImageLoading";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const Container = styled.div`
  margin: 40px auto;
  max-width: 1400px;
  font-family: "Poppins", sans-serif;
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

const SearchWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
`;

const DropDownWrapper = styled.div`
  position: relative;
`;

const DropDownButton = styled.button`
  padding: 10px 18px;
  background: #1f1f1f;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
`;

const DropDownContent = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  background: #1f1f1f;
  color: #fff;
  border-radius: 10px;
  width: 180px;
  z-index: 10;
  display: ${(props) => (props.open ? "block" : "none")};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  overflow: hidden;
`;

const DropDownItem = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff416c;
    color: #fff;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  width: 220px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  }
`;

const Button = styled.button`
  padding: 12px 22px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(255, 65, 108, 0.5);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255, 65, 108, 0.6);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const PagePagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PaginationButton = styled(Button)`
  padding: 8px 14px;
  border-radius: 50%;
  font-weight: bold;

  &:disabled {
    opacity: 0.4;
    cursor: default;
    transform: none;
    box-shadow: none;
  }
`;

const AddBook = () => {
  const [criteria, setCriteria] = useState("Title");
  const [inputValue, setInputValue] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [books, setBooks] = useState([]);
  const [searchDropDownOpen, setSearchDropDownOpen] = useState(false);
  const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [addedBooks, setAddedBooks] = useState({});
  const [loading, setLoading] = useState(false);

  const pageSize = 21;
  const totalPages = Math.ceil(books.length / pageSize);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    setBooks([]);
    setLoading(true);
    const result = await fetchQuery(null, criteria, inputValue, sort);
    setBooks(result || []);
    setPage(1);
    setLoading(false);
  };

  const addtoLib = (book) => {
    if (addedBooks[book.title]) return;
    setAddedBooks((prev) => ({ ...prev, [book.title]: true }));
    let myBooks = JSON.parse(localStorage.getItem("books")) || {};
    myBooks[book.title] = book;
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

  const BookCardWithImageLoading = (props) => {
    const ImageWithLoading = withImageLoading(({ src, alt }) => (
      <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    ));
    return <BookCard {...props} ImageComponent={ImageWithLoading} />;
  };

  const BookGridWithLoading = withLoadingAnimation(BookGrid);

  return (
    <PageWrapper>
      <Container>
        <Heading>Discover Your Next Favorite Book</Heading>

        <SearchWrapper onSubmit={handleSearch}>
          <DropDownWrapper>
            <DropDownButton type="button" onClick={toggleSearchDropDown}>
              Search By: {criteria}
            </DropDownButton>
            <DropDownContent open={searchDropDownOpen}>
              {["Title", "Author", "ISBN"].map((item) => (
                <DropDownItem key={item} onClick={() => handleSearchDropDownItemClick(item)}>
                  {item}
                </DropDownItem>
              ))}
            </DropDownContent>
          </DropDownWrapper>

          <DropDownWrapper>
            <DropDownButton type="button" onClick={toggleSortDropDown}>
              Sort By: {sort}
            </DropDownButton>
            <DropDownContent open={sortDropDownOpen}>
              {["Relevance", "Newest", "Rating"].map((item) => (
                <DropDownItem key={item} onClick={() => handleSortDropDownItemClick(item)}>
                  {item}
                </DropDownItem>
              ))}
            </DropDownContent>
          </DropDownWrapper>

          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${criteria}`}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />

          <Button type="submit">Search</Button>
        </SearchWrapper>

        <BookGridWithLoading loading={loading}>
          {books.length > 0 &&
            books.slice((page - 1) * pageSize, page * pageSize).map((book) => (
              <div key={book.isbn}>
                <BookCardWithImageLoading {...book} />
                <ButtonWrapper>
                  <CardButton variant="add" onClick={() => addtoLib(book)}>
                    {addedBooks[book.title] ? "Added! Enjoy Reading!" : "Add to Library"}
                  </CardButton>
                </ButtonWrapper>
              </div>
            ))}
        </BookGridWithLoading>

        {books.length > 0 && totalPages > 1 && (
          <PagePagination>
            {page > 1 && (
              <PaginationButton onClick={() => setPage(page - 1)}>{"<"}</PaginationButton>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationButton
                key={index}
                onClick={() => setPage(index + 1)}
                disabled={page === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
            {page < totalPages && (
              <PaginationButton onClick={() => setPage(page + 1)}>{">"}</PaginationButton>
            )}
          </PagePagination>
        )}
      </Container>
    </PageWrapper>
  );
};

export default AddBook;
