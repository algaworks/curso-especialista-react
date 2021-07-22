import styled from "styled-components";

export default styled.div`
  display: grid;
  gap: 16px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
