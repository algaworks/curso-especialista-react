import usePeople from "./hooks/usePeople"

export default function PeopleList () {
  const { people, addPerson } = usePeople();

  return <>
    <ul>
      { people.map(person => <li key={person}>{ person }</li>) }
    </ul>
    <button onClick={() => addPerson('Mario')}>
      adicionar pessoa
    </button>
  </>
}