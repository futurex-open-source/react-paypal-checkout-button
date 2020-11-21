import React, { useRef } from 'react'
import PayPalCheckout, { usePayPal } from 'react-paypal-checkout-button'

export const UsingComponent = () => (
  <PayPalCheckout
    intent='CAPTURE'
    clientId={process.env.REACT_APP_PAYPAL_CLIENT_ID}
    amount={100}
    currency='USD'
    onSuccess={(data, order) => {
      console.log({ data, order })
    }}
    onError={(error) => {
      console.log({ error })
    }}
  />
)

export const UsingHook = () => {
  const paypalRef = useRef(null)

  const { isLoadingButton, errorMessage, onRetry, buttonLoaded } = usePayPal({
    amount: 100,
    paypalRef,
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    onSuccess: (data, order) => {
      console.log({ data, order })
    },
    onError: (error) => {
      console.log({ error })
    }
  })

  if (isLoadingButton) return <h1>Loading....</h1>

  if (errorMessage)
    return (
      <div>
        <h1>{errorMessage}</h1>

        <button onClick={onRetry}>Try Again</button>
      </div>
    )

  return buttonLoaded ? <div ref={paypalRef} /> : null
}
