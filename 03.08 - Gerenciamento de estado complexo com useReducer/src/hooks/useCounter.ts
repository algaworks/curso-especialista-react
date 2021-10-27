import { useEffect, useState } from "react"

export default function useCounter (initialNumber = 1) {
  const [number, setNumber] = useState(initialNumber)

  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1)
    }, 5000)
  }, [])

  return number
}