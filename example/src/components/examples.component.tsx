/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import PayPalCheckout, { usePayPalCheckout } from 'react-paypal-checkout-button'

// const buttonStyles: StylesOptions = {
//   layout: 'vertical',
//   color: 'blue',
//   shape: 'pill',
//   label: 'buynow',
//   height: 55,
//   tagline: false
// }

export const UsingComponent = () => {
  return (
    <PayPalCheckout
      intent='CAPTURE'
      clientId={process.env.REACT_APP_PAYPAL_CLIENT_ID}
      amount={100}
      currency='USD'
      // buttonStyles={buttonStyles}
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
  const [show, setShow] = useState(false)

  const { isLoadingButton, paypalRef } = usePayPalCheckout({
    amount: 100,
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    onSuccess: (data, order) => {
      console.log({ data, order })
    },
    onError: (error) => {
      console.log({ error })
    }
  })

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        style={{ margin: '2rem', background: 'white', padding: '10px' }}
      >
        {show ? 'hide button' : 'show button'}
      </button>

      {show && (
        <>
          <div ref={paypalRef} />

          {isLoadingButton && <h3>loading...</h3>}
        </>
      )}
    </>
  )
}
