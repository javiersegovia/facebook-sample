import cx from 'classnames'
import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form'
import { baseStyles, errorStyles } from './Input'
import { ErrorMessage } from './ErrorMessage'
import { Label } from './Label'

type SelectProps = {
  name: string
  label?: string
  value?: string
  className?: string
  validations?: RegisterOptions
  options: {
    value: string
    label: string
  }[]
}

export const Select = ({
  name,
  className = '',
  label,
  validations = {},
  options,
  ...otherProps
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const fieldError: FieldError | undefined = errors?.[name]

  return (
    <Label htmlFor={name} description={label} className="block w-full">
      <select
        {...otherProps}
        {...register(name, {
          ...validations,
        })}
        id={name}
        name={name}
        className={cx(
          'pr-8',
          {
            [baseStyles]: true,
            [errorStyles]: !!fieldError,
          },
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {Object.keys(validations).length !== 0 && (
        <ErrorMessage>{fieldError?.message}</ErrorMessage>
      )}
    </Label>
  )
}
