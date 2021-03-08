import { useState, useCallback } from "react";

function useInputs<T>(initialForm: T):[T, (e: any) => void, () => void] {
  const [form, setForm] = useState(initialForm)

  const onChange = useCallback(e => {
    const {name, value} = e.target
    setForm(form => ({ ...form, [name]: value }))
  }, [])

  const reset = useCallback(() => setForm(initialForm), [initialForm])
  return [form, onChange, reset]
}

export default useInputs