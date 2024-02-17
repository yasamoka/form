import { createContext, useContext } from 'solid-js'
import type { FormApi, FormValidator } from '@tanstack/form-core'

type FormContextType =
  | undefined
  | {
      formApi: FormApi<any, FormValidator<any, unknown> | undefined>
      parentFieldName?: string
    }

export const formContext = createContext<FormContextType>(undefined)

export function useFormContext() {
  const formApi: FormContextType = useContext(formContext)

  if (!formApi)
    throw new Error(`You are trying to use the form API outside of a form!`)

  return formApi
}
