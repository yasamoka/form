import { object, string } from 'valibot'
import { FieldApi, FormApi } from '@tanstack/form-core'
import { assertType } from 'vitest'
import { valibotValidator } from '../validator'

it('should allow a Valibot validator to be passed in', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: valibotValidator,
  } as const)
})

it('should allow a Valibot validator to handle the correct Valibot type', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: valibotValidator,
    validators: {
      onChange: string(),
    },
  } as const)
})

it('should allow a Valibot validator to handle the correct Valibot type for an async method', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: valibotValidator,
    validators: {
      onChangeAsync: string(),
    },
  } as const)
})

it('should allow a functional onChange to be passed when using a validator', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: valibotValidator,
    validators: {
      onChange: ({ value }) => {
        assertType<'test'>(value)
        return undefined
      },
    },
  })
})

it('should not allow a validator onChange to be passed when not using a validator', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    // @ts-expect-error Requires a validator
    onChange: string(),
  } as const)
})

// This is not possible without higher-kinded types AFAIK
it.skip('should allow not a Valibot validator with the wrong Valibot type', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: valibotValidator,
    validators: {
      onChange: object({}),
    },
  } as const)
})
