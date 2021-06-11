import cx from 'classnames'
import { FieldError, RegisterOptions, useFormContext } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'
import { Label } from './Label'

export const baseStyles = ` 
  bg-white shadow-sm block w-full p-3 text-sm leading-6 rounded-md border border-gray-300 
  focus:outline-none focus:ring-2 focus:border-blue-400 focus:ring-blue-400
`

export const errorStyles =
  'text-red-600 border-red-500 focus:border-red-500 focus:ring-red-500'

interface InputProps {
  name: string
  label?: string
  value?: string
  type?: string
  className?: string
  placeholder?: string
  validations?: RegisterOptions
  isTextArea?: boolean
}

export const Input = ({
  name,
  className = '',
  type = 'text',
  placeholder,
  label,
  validations = {},
  isTextArea = false,
  ...otherProps
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const fieldError: FieldError | undefined = errors?.[name]
  const InputElement = isTextArea ? 'textarea' : 'input'

  return (
    <Label htmlFor={name} description={label} className="block w-full">
      <InputElement
        {...otherProps}
        {...register(name, {
          ...validations,
        })}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        rows={3}
        className={cx(
          {
            'resize-none': isTextArea,
            [baseStyles]: true,
            [errorStyles]: !!fieldError,
          },
          className
        )}
      />
      {Boolean(validations) && (
        <ErrorMessage>{fieldError?.message}</ErrorMessage>
      )}
    </Label>
  )
}
