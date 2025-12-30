import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BackButton from "../components/BackButton";
import withLoading from "../HOC/withLoading";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 12px;
`;

const Input = styled.input`
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px;
  background: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
`;

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Book Added: ${title} by ${author}`);
    setTitle("");
    setAuthor("");
  };

  return (
    <PageWrapper>
      <BackButton />
      <h2>Add a New Book</h2>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Button type="submit">Save Book</Button>
      </Form>
    </PageWrapper>
  );
};

export default withLoading(AddBook);
