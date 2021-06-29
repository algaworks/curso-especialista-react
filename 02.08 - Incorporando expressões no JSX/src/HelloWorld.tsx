export default function HelloWorld () {
  const name = 'Daniel'

  return <div>
    <h1>Hello,
      { name === 'Daniel'
          ? 'Danilo'
          : name
      }!!!</h1>
  </div>
}