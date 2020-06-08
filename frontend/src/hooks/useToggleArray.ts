import { useState } from 'react'

export default (init: string[]): [string[], (value: string) => void] => {
  const [values, setValues] = useState(init)

  const toggle = (value: string) => {
    setValues(oldState => {
      return oldState.includes(value) ?
        oldState.filter(v => v !== value) :
        [...oldState, value]
    })
  }

  return [values, toggle]
}