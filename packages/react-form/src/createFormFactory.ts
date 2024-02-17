import { Field, useField } from './useField'
import { useForm } from './useForm'
import { getValidateFormData } from './validateFormData'
import type { ValidateFormData } from './validateFormData'
import type { FieldComponent, UseField } from './useField'
import type { FormApi, FormOptions, FormValidator } from '@tanstack/form-core'

export type FormFactory<
  TFormData,
  TFormValidator extends
    | FormValidator<TFormData, unknown>
    | undefined = undefined,
> = {
  useForm: (
    opts?: FormOptions<TFormData, TFormValidator>,
  ) => FormApi<TFormData, TFormValidator>
  useField: UseField<TFormData>
  Field: FieldComponent<TFormData, TFormValidator>
  validateFormData: ValidateFormData<TFormData, TFormValidator>
  initialFormState: Partial<FormApi<TFormData, TFormValidator>['state']>
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
    validateFormData: getValidateFormData(defaultOpts) as never,
    initialFormState: {
      errorMap: {
        onServer: undefined,
      },
      errors: undefined, // check whether to replace with {}
    },
  }
}
