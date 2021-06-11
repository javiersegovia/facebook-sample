import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
import { Spinner } from '@components/Spinner'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  isLoading?: boolean
  showSuccess?: boolean
}

export const Button = ({
  type = 'button',
  disabled = false,
  children,
  className = '',
  isLoading = false,
  ...otherProps
}: IButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        'bg-blue-700 text-white transform active:scale-95 w-full flex justify-center',
        'rounded-md py-3 font-bold transition duration-100 text-center',
        {
          'opacity-40 cursor-not-allowed': disabled,
        },
        className
      )}
      {...otherProps}
    >
      {isLoading ? <Spinner /> : <>{children}</>}
    </button>
  )
}
