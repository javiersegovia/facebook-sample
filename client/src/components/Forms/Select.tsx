import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'
import { Label } from './Label'
import cx from 'classnames'
import { capitalize } from '@lib/capitalize'
import { baseStyles, errorStyles } from './Input'

type SelectProps = {
  name: string
  label?: string
  value?: string
  className?: string
  placeholder?: string
  validations?: RegisterOptions
  options: string[]
}

export const Select = ({
  name,
  className = '',
  placeholder,
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
        placeholder={placeholder}
        className={cx(
          'pr-8',
          {
            [baseStyles]: true,
            [errorStyles]: !!fieldError,
          },
          className
        )}
      >
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue} className="capitalize">
            {capitalize(optionValue.toLowerCase())}
          </option>
        ))}
      </select>
      {Object.keys(validations).length !== 0 && (
        <ErrorMessage>{fieldError?.message}</ErrorMessage>
      )}
    </Label>
  )
}
