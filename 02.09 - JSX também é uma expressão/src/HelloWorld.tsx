export default function HelloWorld () {
  const name = 'Daniel'
  const title = <h1>Hello, {name}!</h1>

  if (name === 'Daniel') {
    return <div>
      <h1 style={{ background: 'red' }}>{ name }</h1>
    </div>
  }

  return <div>
    {title}
  </div>
}