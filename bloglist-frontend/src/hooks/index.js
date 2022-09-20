import { useState } from 'react'

export const useField = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }
  const validFields = {
    onChange,
    value,
    type,
  }
  return {
    validFields,
    reset,
  }
}
