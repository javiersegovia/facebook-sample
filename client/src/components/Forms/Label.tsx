interface ILabelProps {
  htmlFor: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export const Label = ({ htmlFor = '', description, className = '', children }: ILabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      {description && <span className="block mb-1 text-xs font-bold">{description}</span>}
      {children}
    </label>
  )
}
