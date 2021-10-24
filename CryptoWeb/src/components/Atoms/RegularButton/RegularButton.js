import styled from "styled-components";

const RegularButton = styled.button`
  height: 3rem;
  padding: 1rem;
  border: 1.5px solid white;
  border-radius: 0.5rem;
  background-color: rgb(216, 0, 0);
  margin: auto;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  &:hover {
    background-color: darken(rgb(216, 0, 0), 5%);
  }
`;

export default RegularButton;
