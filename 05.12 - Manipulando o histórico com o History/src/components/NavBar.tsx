import { MouseEvent } from "react";
import { useHistory } from "react-router";

export default function NavBar () {
  const history = useHistory();
  
  function handleAnchorClick (e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    
    const newRoute = e.currentTarget.getAttribute('href')
    
    if (newRoute)
      history.push(newRoute)
  }

  return <nav>
    <ul>
      <li><a onClick={handleAnchorClick} href="/">Home</a></li>
      <li><a onClick={handleAnchorClick} href="/contato">Contato</a></li>
    </ul>
  </nav>
}