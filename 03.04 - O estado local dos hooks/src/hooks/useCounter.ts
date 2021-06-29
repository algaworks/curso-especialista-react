import { useEffect, useState } from "react"

export default function useCounter () {
  const [number, setNumber] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      setNumber(2)
    }, 5000)
  }, [])

  return number
}