/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react'
import { PayPalCheckoutProps } from '../../types'

import styles from '../../styles.module.css'
import usePayPalCheckout from '../../hooks/use-paypal-checkout.hook'
import Spinner from '../spinner.component'
import ErrorContainer from '../error-container.component'

const PayPalCheckout: React.FC<PayPalCheckoutProps> = (props) => {
  const {
    isLoadingButton,
    errorMessage,
    onRetry,
    paypalRef
  } = usePayPalCheckout({
    ...props
  })

  const renderReactPayPalStates = () => {
    // If the button is loading, show the spinner
    if (isLoadingButton) return <Spinner isLoading={isLoadingButton} />

    // If there is an error, show the error message
    if (errorMessage)
      return <ErrorContainer errorMessage={errorMessage} onRetry={onRetry} />

    return null
  }

  return (
    <div className={styles.container}>
      <div ref={paypalRef} />

      {renderReactPayPalStates()}
    </div>
  )
}

export default React.memo(PayPalCheckout)
