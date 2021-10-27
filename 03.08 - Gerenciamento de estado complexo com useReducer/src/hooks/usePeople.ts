import { useState } from "react";

export default function usePeople () {
  const [people, setPeople] = useState(['Daniel', 'Alex'])

  function addPerson (name: string) {
    setPeople([...people, name])
  }

  return {
    people,
    addPerson
  }
}