import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export const Container = ({
  children,
  className = '',
  ...otherProps
}: ContainerProps) => {
  return (
    <section className={`max-w-screen-lg mx-auto w-full ${className}`} {...otherProps}>
      {children}
    </section>
  )
}
