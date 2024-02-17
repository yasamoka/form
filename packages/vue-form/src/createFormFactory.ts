import { Field, useField } from './useField'
import { useForm } from './useForm'
import type { FormApi, FormOptions, FormValidator } from '@tanstack/form-core'
import type { FieldComponent, UseField } from './useField'

export type FormFactory<
  TFormData,
  TFormValidator extends
    | FormValidator<TFormData, unknown>
    | undefined = undefined,
> = {
  useForm: (
    opts?: FormOptions<TFormData, TFormValidator>,
  ) => FormApi<TFormData, TFormValidator>
  useField: UseField<TFormData, TFormValidator>
  Field: FieldComponent<TFormData, TFormValidator>
}

export function createFormFactory<
  TFormData,
  TFormValidator extends
    | FormValidator<TFormData, unknown>
    | undefined = undefined,
>(
  defaultOpts?: FormOptions<TFormData, TFormValidator>,
): FormFactory<TFormData, TFormValidator> {
  return {
    useForm: (opts) => {
      const formOptions = Object.assign({}, defaultOpts, opts)
      return useForm<TFormData, TFormValidator>(formOptions)
    },
    useField: useField as any,
    Field: Field as any,
  }
}
