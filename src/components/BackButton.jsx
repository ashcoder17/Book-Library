import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  margin-bottom: 20px;
  background: transparent;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = () => {
    const navigate = useNavigate();
    return <Button onClick={() => navigate(-1)}>← Back</Button>;
};

export default BackButton;
