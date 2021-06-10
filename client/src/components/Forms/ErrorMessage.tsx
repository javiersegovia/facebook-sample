import React from 'react'

export const ErrorMessage: React.FC = ({ children }) => {
  return <span className="text-red-600 ml-3 text-xs">{children}</span>
}
