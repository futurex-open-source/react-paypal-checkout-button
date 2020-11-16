/* eslint-disable no-unused-vars */
import React from 'react'
import { ErrorContainerProps } from '../types'

const ErrorContainer: React.FC<ErrorContainerProps> = ({
  errorMessage,
  onRetry
}) => (
  <div className='error-container'>
    <p className='error-message'>{errorMessage}</p>

    <button onClick={onRetry}>Try again</button>
  </div>
)

export default ErrorContainer
