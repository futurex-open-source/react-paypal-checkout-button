/* eslint-disable no-unused-vars */
import React from 'react'
import { ErrorContainerProps } from '../types'
import styles from '../styles.module.css'

const ErrorContainer: React.FC<ErrorContainerProps> = ({
  errorMessage,
  onRetry
}) => (
  <div className={styles['error-container']}>
    <p className={styles['error-message']}>{errorMessage}</p>

    <button onClick={onRetry && onRetry} className={styles['retry-button']}>
      Try again
    </button>
  </div>
)

export default ErrorContainer
