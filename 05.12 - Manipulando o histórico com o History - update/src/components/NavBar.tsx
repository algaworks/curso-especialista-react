import { MouseEvent } from "react";
import { useNavigate } from "react-router";

export default function NavBar () {
  const navigate = useNavigate();
  
  function handleAnchorClick (e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    
    const newRoute = e.currentTarget.getAttribute('href')
    
    if (newRoute)
      navigate(newRoute)
  }

  return <nav>
    <ul>
      <li><a onClick={handleAnchorClick} href="/home">Home</a></li>
      <li><a onClick={handleAnchorClick} href="/contato">Contato</a></li>
    </ul>
  </nav>
}