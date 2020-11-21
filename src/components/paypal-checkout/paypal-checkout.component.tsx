/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { PayPalCheckoutProps } from '../../types'
import ErrorContainer from '../error-container.component'
import Spinner from '../spinner.component'

import styles from '../../styles.module.css'
import usePayPal from '../../hooks/use-paypal.hook'

const PayPalCheckout: React.FC<PayPalCheckoutProps> = (props) => {
  const paypalRef = useRef(null)

  const { isLoadingButton, buttonLoaded, errorMessage, onRetry } = usePayPal({
    paypalRef,
    ...props
  })

  const renderReactPayPal = () => {
    if (!buttonLoaded && isLoadingButton && !errorMessage)
      return <Spinner isLoading={isLoadingButton} />

    if (errorMessage)
      return <ErrorContainer errorMessage={errorMessage} onRetry={onRetry} />

    return <div ref={paypalRef} />
  }

  return <div className={styles.container}>{renderReactPayPal()}</div>
}

export default PayPalCheckout
