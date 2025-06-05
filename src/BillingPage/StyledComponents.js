import styled from "styled-components";

export const ApiError = styled.p`color: red; text-align: center; padding: 10px; border: 1px solid red`

export const AddToCartButton = styled.button`
  padding: clamp(0.6rem, 1.5vh, 0.8rem) clamp(1rem, 2.5vw, 1.5rem);
  background-color: #6f42c1;
  color: white;
  border: none;
  border-radius: clamp(0.3rem, 0.8vw, 0.5rem);
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 500;
  min-height: clamp(2.5rem, 5vh, 3rem);
  margin-top: clamp(1rem, 1vh, 0.5rem); /* This margin might be specific to its position in FormRow */
  cursor: pointer;

  &:hover {
    background-color:rgb(50, 73, 163);
  }`

  export const MenuButton = styled.button`
  
  padding: clamp(0.6rem, 1.5vh, 0.8rem) clamp(1rem, 2.5vw, 1.5rem);
  background-color: #6f42c1;
  color: white;
  border: none;
  border-radius: clamp(0.3rem, 0.8vw, 0.5rem);
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 500;
  min-height: clamp(2.5rem, 5vh, 3rem);
  margin-top: clamp(1rem, 1vh, 0.5rem); 
  cursor: pointer;

  &:hover {
    background-color:rgb(50, 73, 163);
  }
`