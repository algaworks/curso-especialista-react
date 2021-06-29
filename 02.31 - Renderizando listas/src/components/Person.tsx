import { useState } from "react"

export default function Person () {
  const [person, setPerson] = useState<string>('Daniel')

  setTimeout(() => {
    setPerson('Cleberson')
  }, 2000)

  return <div>
    <h1>Perfil</h1>
    <p>Este é o perfil de {person}</p>
  </div>
}