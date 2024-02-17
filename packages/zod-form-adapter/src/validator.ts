import type { SafeParseError, ZodType, ZodTypeAny } from 'zod'
import type { FormValidationErrors, ValidationError } from '@tanstack/form-core'

export const zodValidator = () => {
  return {
    validate({ value }: { value: unknown }, fn: ZodType): ValidationError {
      // Call Zod on the value here and return the error message
      const result = (fn as ZodTypeAny).safeParse(value)
      if (!result.success) {
        return (result as SafeParseError<any>).error.issues
          .map((issue) => issue.message)
          .join(', ')
      }
      return
    },
    async validateAsync(
      { value }: { value: unknown },
      fn: ZodType,
    ): Promise<ValidationError> {
      // Call Zod on the value here and return the error message
      const result = await (fn as ZodTypeAny).safeParseAsync(value)
      if (!result.success) {
        return (result as SafeParseError<any>).error.issues
          .map((issue) => issue.message)
          .join(', ')
      }
      return
    },
  }
}

export const zodFormValidator = <TFormData>() => {
  return {
    validate(
      { value }: { value: unknown },
      fn: ZodType,
    ): FormValidationErrors<TFormData> {
      // Call Zod on the value here and return the error message
      const result = (fn as ZodTypeAny).safeParse(value)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
    async validateAsync(
      { value }: { value: unknown },
      fn: ZodType,
    ): Promise<FormValidationErrors<TFormData>> {
      // Call Zod on the value here and return the error message
      const result = await (fn as ZodTypeAny).safeParseAsync(value)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  }
}
