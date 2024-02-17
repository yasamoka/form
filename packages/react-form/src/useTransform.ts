import type { FormApi, FormValidator } from '@tanstack/form-core'

export function useTransform<
  TFormData,
  TFormValidator extends
    | FormValidator<TFormData, unknown>
    | undefined = undefined,
>(
  fn: (
    formBase: FormApi<TFormData, TFormValidator>,
  ) => FormApi<TFormData, TFormValidator>,
  deps: unknown[],
) {
  return {
    fn,
    deps,
  }
}
