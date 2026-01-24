import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import styled, { keyframes } from "styled-components";
import fetchQuery from "../components/fetchQuery";
import withLoadingAnimation from "../components/hoc/withLoadingAnimation";
import BookGrid from "../components/BookGrid";
import withImageLoading from "../components/hoc/withImageLoading";
import BookCard from "../components/BookCard";
import CardButton from "../components/CardButton";
import SidePanel from "../components/SidePanel";
import fetchBookDetails from "../components/fetchBookDetails";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const Container = styled.div`
  margin: 60px auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 20px;
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
  margin-bottom: 30px;
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const CategoryCard = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
  color: #3498db;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PlaceholderText = styled.p`
  font-size: 1.1rem;
  color: #777;
  font-weight: 500;
`;

const AllBooks = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("fiction");
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [addedBooks, setAddedBooks] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [panelLoading, setPanelLoading] = useState(false);

  const addtoLib = (book) => {
    if (addedBooks[book.title]) return;
    setAddedBooks((prev) => ({ ...prev, [book.title]: true }));
    let myBooks = JSON.parse(localStorage.getItem("books")) || {};
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

  const handleBookClick = async (book) => {
    setPanelLoading(true);
    const details = await fetchBookDetails(book);
    setSelectedBook(details);
    setPanelLoading(false);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setBooksLoading(true);
    try {
      const fetchedBooks = await fetchQuery(
        "category",
        "Category",
        category.toLowerCase(),
        "Relevance"
      );
      setBooks(fetchedBooks);
    } catch (error) {
      console.error(error);
    } finally {
      setBooksLoading(false);
    }
  };

  const BookCardWithImageLoading = (props) => {
    const ImageWithLoading = withImageLoading(({ src, alt }) => (
      <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    ));
    return <BookCard {...props} ImageComponent={ImageWithLoading} />;
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("books")) || {};
    setAddedBooks(stored);
  }, []);

  useEffect(() => {
    const fetchCategories = () => {
      setTimeout(() => {
        setCategories([
          "Fiction",
          "SciFi",
          "Biography",
          "Mystery",
          "Fantasy",
          "Historical"
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    handleCategoryClick("Fiction");
  }, []);

  const BookGridWithLoading = withLoadingAnimation(BookGrid);

  return (
    <PageWrapper>
      <Container>
        <Heading>Library Catalog</Heading>

        {loading ? (
          <PlaceholderText>Loading categories...</PlaceholderText>
        ) : (
          <CategoryGrid>
            {categories.map((category, index) => (
              <CategoryCard key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </CategoryCard>
            ))}
          </CategoryGrid>
        )}

        {selectedCategory && (
          <>
            {booksLoading ? (
              <PlaceholderText>Loading books...</PlaceholderText>
            ) : books.length === 0 ? (
              <PlaceholderText>No books found</PlaceholderText>
            ) : (
              <BookGridWithLoading loading={loading}>
                {books.map((book) => (
                  <div key={book.id}>
                    <BookCardWithImageLoading {...book} onClick={() => handleBookClick(book)} />
                    <ButtonWrapper>
                      <CardButton
                        type="button"
                        variant="add"
                        onClick={(e) => {
                          e.stopPropagation();
                          addedBooks[book.title] ? removeFromLib(book.title) : addtoLib(book);
                        }}
                      >
                        {addedBooks[book.title] ? "Added! Click to Remove" : "Add to Library"}
                      </CardButton>
                    </ButtonWrapper>
                  </div>
                ))}
              </BookGridWithLoading>
            )}
          </>
        )}
      </Container>

      <SidePanel
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        inLibrary={!!selectedBook && !!addedBooks[selectedBook.title]}
        onAdd={(book) => addtoLib(book)}
        onRemove={(title) => removeFromLib(title)}
      />
    </PageWrapper>
  );
};

export default AllBooks;
