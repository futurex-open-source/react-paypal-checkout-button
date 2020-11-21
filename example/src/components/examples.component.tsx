/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'
import PayPalCheckout, {
  usePayPalCheckout,
  StylesOptions
} from 'react-paypal-checkout-button'

const styles: StylesOptions = {
  layout: 'vertical',
  color: 'blue',
  shape: 'pill',
  label: 'buynow',
  height: 55,
  tagline: false
}

export const UsingComponent = () => {
  return (
    <PayPalCheckout
      intent='CAPTURE'
      clientId={process.env.REACT_APP_PAYPAL_CLIENT_ID}
      amount={100}
      currency='USD'
      // styles={styles}
      onSuccess={(data, order) => {
        console.log({ data, order })
      }}
      onError={(error) => {
        console.log({ error })
      }}
    />
  )
}

export const UsingHook = () => {
  const paypalRef = useRef(null)

  const {
    isLoadingButton,
    errorMessage,
    buttonLoaded,
    onRetry
  } = usePayPalCheckout({
    amount: 100,
    paypalRef,
    styles,
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    onSuccess: (data, order) => {
      console.log({ data, order })
    },
    onError: (error) => {
      console.log({ error })
    }
  })

  if (isLoadingButton) return <h3>Loading...</h3>

  if (errorMessage)
    return (
      <div>
        <h2>{errorMessage}</h2>

        <button onClick={onRetry}>Try Again</button>
      </div>
    )

  return buttonLoaded ? <div ref={paypalRef} /> : null
}
