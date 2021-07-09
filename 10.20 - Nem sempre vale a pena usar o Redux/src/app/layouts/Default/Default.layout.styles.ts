import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1140px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 64px;
`

export const Main = styled.main`
  display: grid;
  grid-template-columns: 214px 680px 214px;
  gap: 16px;
`

export const Navigation = styled.nav`
  display: flex;
  padding-right: 32px;
  justify-content: flex-end;
`

export const Aside = styled.aside``

export const FeaturedContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 32px;
`