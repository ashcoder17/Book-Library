import React, { useState, useRef, useEffect, useContext, memo } from "react";
import styled, { keyframes } from "styled-components";

import fetchQuery from "../components/fetchQuery";
import PageWrapper from "../components/PageWrapper";
import BookCard from "../components/BookCard";
import CardButton from "../components/CardButton";
import BookGrid from "../components/BookGrid";
import fetchBookDetails from "../components/fetchBookDetails";

import withLoadingAnimation from "../components/hoc/withLoadingAnimation";
import SidePanel from "../components/SidePanel";
import { ThemeContext } from "../components/ThemeContext";

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

const InputWrapper = styled.div`
  position: relative;
`;

const SuggestionBox = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: ${(props) => (props.dark ? "#ffffff" : "#1f1f1f")};
  border-radius: 12px;
  z-index: 20;
  max-height: 280px;
  overflow-y: auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
`;

const SuggestionItem = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  color: ${(props) => (props.dark ? "#121212" : "#ffffff")};

  &:hover {
    background: #ff416c;
    color: #ffffff;
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

const withImageLoading = (Component) => ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const cache = useRef({});

  useEffect(() => {
    if (cache.current[src]) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      cache.current[src] = true;
      setLoaded(true);
    };
  }, [src]);

  return loaded ? (
    <Component src={src} alt={alt} {...props} />
  ) : (
    <div style={{ width: "100%", height: "200px", background: "#eee" }} />
  );
};

const AddBook = () => {
  const { darkMode } = useContext(ThemeContext);

  const [criteria, setCriteria] = useState("Title");
  const [inputValue, setInputValue] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [books, setBooks] = useState([]);
  const [searchDropDownOpen, setSearchDropDownOpen] = useState(false);
  const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [page, setPage] = useState(1);
  const [addedBooks, setAddedBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [panelLoading, setPanelLoading] = useState(false);

  const typingTimeout = useRef(null);
  const bookCache = useRef({});
  const lastRequestId = useRef(0);

  const searchDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const pageSize = 24;
  const totalPages = Math.ceil(books.length / pageSize);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("books")) || {};
    setAddedBooks(stored);

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target)
      ) {
        setSearchDropDownOpen(false);
      }

      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target)
      ) {
        setSortDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const BookCardWithImageLoading = (props) => {
    const ImageWithLoading = withImageLoading(({ src, alt }) => (
      <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    ));
    return <BookCard {...props} ImageComponent={ImageWithLoading} />;
  };

  const MemoizedBookCard = memo(BookCardWithImageLoading);

  const handleBookClick = async (book) => {
    setPanelLoading(true);

    if (bookCache.current[book.id]) {
      setSelectedBook(bookCache.current[book.id]);
      setPanelLoading(false);
      return;
    }

    const detailedBook = await fetchBookDetails(book);
    bookCache.current[book.id] = detailedBook;
    setSelectedBook(detailedBook);
    setPanelLoading(false);
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    setBooks([]);
    setLoading(true);
    const result = await fetchQuery("search", criteria, inputValue, sort);
    setSuggestions([]);
    setShowSuggestions(false);
    setBooks(result || []);
    setPage(1);
    setLoading(false);
  };

  const handleLiveSearch = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const requestId = ++lastRequestId.current;
    const result = await fetchQuery("search", criteria, value, "Relevance");
    if (requestId !== lastRequestId.current) return;

    setSuggestions(result?.slice(0, 6) || []);
    setShowSuggestions(true);
  };

  const addToLib = (book) => {
    if (addedBooks[book.title]) {
      removeFromLib(book.title);
      return;
    }

    setAddedBooks((prev) => ({ ...prev, [book.title]: book }));
    const myBooks = JSON.parse(localStorage.getItem("books")) || {};
    myBooks[book.title] = book;
    localStorage.setItem("books", JSON.stringify(myBooks));
  };

  const removeFromLib = (title) => {
    setAddedBooks((prev) => {
      const updated = { ...prev };
      delete updated[title];
      return updated;
    });
    const myBooks = JSON.parse(localStorage.getItem("books")) || {};
    delete myBooks[title];
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

  const BookGridWithLoading = withLoadingAnimation(BookGrid);

  return (
    <PageWrapper>
      <Container>
        <Heading>Discover Your Next Favorite Book</Heading>

        <SearchWrapper onSubmit={handleSearch}>
          <DropDownWrapper ref={searchDropdownRef}>
            <DropDownButton type="button" onClick={toggleSearchDropDown}>
              Search By: {criteria}
            </DropDownButton>
            <DropDownContent open={searchDropDownOpen}>
              {["Title", "Author", "ISBN"].map((item) => (
                <DropDownItem
                  key={item}
                  onClick={() => handleSearchDropDownItemClick(item)}
                >
                  {item}
                </DropDownItem>
              ))}
            </DropDownContent>
          </DropDownWrapper>

          <DropDownWrapper ref={sortDropdownRef}>
            <DropDownButton type="button" onClick={toggleSortDropDown}>
              Sort By: {sort}
            </DropDownButton>
            <DropDownContent open={sortDropDownOpen}>
              {["Relevance", "Newest", "Rating"].map((item) => (
                <DropDownItem
                  key={item}
                  onClick={() => handleSortDropDownItemClick(item)}
                >
                  {item}
                </DropDownItem>
              ))}
            </DropDownContent>
          </DropDownWrapper>

          <InputWrapper>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);

                if (typingTimeout.current)
                  clearTimeout(typingTimeout.current);
                typingTimeout.current = setTimeout(() => {
                  handleLiveSearch(value);
                }, 500);
              }}
              onFocus={() => suggestions.length && setShowSuggestions(true)}
              placeholder={`Enter ${criteria}`}
              onBlur={() =>
                setTimeout(() => setShowSuggestions(false), 150)
              }
            />

            {showSuggestions && suggestions.length > 0 && (
              <SuggestionBox dark={darkMode}>
                {suggestions.map((book) => (
                  <SuggestionItem
                    dark={darkMode}
                    key={book.id}
                    onMouseDown={() => {
                      setInputValue(book.title);
                      setShowSuggestions(false);
                      handleSearch();
                    }}
                  >
                    {book.title}
                  </SuggestionItem>
                ))}
              </SuggestionBox>
            )}
          </InputWrapper>

          <Button type="submit">Search</Button>
        </SearchWrapper>

        <BookGridWithLoading loading={loading}>
          {books.length > 0 &&
            books
              .slice((page - 1) * pageSize, page * pageSize)
              .map((book) => (
                <div key={book.id}>
                  <MemoizedBookCard
                    {...book}
                    onClick={() => handleBookClick(book)}
                  />
                  <ButtonWrapper>
                    <CardButton
                      type="button"
                      variant="add"
                      onClick={() => addToLib(book)}
                    >
                      {addedBooks[book.title]
                        ? "Added! Click to Remove"
                        : "Add to Library"}
                    </CardButton>
                  </ButtonWrapper>
                </div>
              ))}
        </BookGridWithLoading>

        {books.length > 0 && totalPages > 1 && (
          <PagePagination>
            {page > 1 && (
              <PaginationButton
                type="button"
                onClick={() => setPage(page - 1)}
              >
                {"<"}
              </PaginationButton>
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
              <PaginationButton
                type="button"
                onClick={() => setPage(page + 1)}
              >
                {">"}
              </PaginationButton>
            )}
          </PagePagination>
        )}
      </Container>

      <SidePanel
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        inLibrary={
          !!selectedBook && !!addedBooks[selectedBook.title]
        }
        onAdd={addToLib}
        onRemove={removeFromLib}
        loading={panelLoading}
      />
    </PageWrapper>
  );
};

export default AddBook;
