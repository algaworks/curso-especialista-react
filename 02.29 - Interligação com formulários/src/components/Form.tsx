import { useState } from "react"

export default function Form () {
  const [name, setName] = useState('Arthur')

  return <div>
    <input
      placeholder="Nome"
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <div>
      { name }
    </div>
  </div>
}