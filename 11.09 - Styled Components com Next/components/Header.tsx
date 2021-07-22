import styled from "styled-components";

export default function Header(props: any) {
  return (
    <>
      <Title>oi eu sou um header - {props.name}</Title>
    </>
  );
}

const Title = styled.h1`
  color: blue;
`;
