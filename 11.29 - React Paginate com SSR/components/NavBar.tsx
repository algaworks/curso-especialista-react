import styled from "styled-components";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Wrapper>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </Wrapper>
    </nav>
  );
}

const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;

  a {
    color: ${(p) => p.theme.pageForeground};
    text-decoration: none;
    text-transform: lowercase;
  }
`;
