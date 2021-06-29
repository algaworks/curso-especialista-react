import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function NavBar () {
  return <>
    <List>
      <Item><NavLink exact to="/">Home</NavLink></Item>
      <Item><NavLink exact to="/editores">Editores</NavLink></Item>
      <Item><NavLink exact to="/posts/criar">Novo Post</NavLink></Item>
    </List>
  </>
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
`

const Item = styled.li`
  text-transform: lowercase;
  font-size: 18px;

  a {
    text-decoration: none;
    color: #274060;

    &.active {
      color: #09f;
    }
  }
`

