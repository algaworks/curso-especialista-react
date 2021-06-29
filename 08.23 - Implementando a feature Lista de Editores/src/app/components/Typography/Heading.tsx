import styled from "styled-components"

export interface HeadingProps {
  level: 1 | 2 | 3
  children: React.ReactNode
}

export default function Heading ({ level, children }: HeadingProps) {
  const Component = ({
    1: Heading1,
    2: Heading2,
    3: Heading3
  }[level])

  return <Component>
    { children }
  </Component>
}

const Heading1 = styled.h1`
  font-weight: 900;
  font-size: 36px;
  color: #274060;
`

const Heading2 = styled.h2`
  font-weight: 900;
  font-size: 24px;
  color: #274060;
`

const Heading3 = styled.h3`
  font-weight: 900;
  font-size: 18px;
  color: #274060;
`