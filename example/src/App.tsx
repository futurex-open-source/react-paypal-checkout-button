import React from 'react'

import PayPalCheckout from 'react-paypal-checkout-button'
import 'react-paypal-checkout-button/dist/index.css'

const App = () => {
  return (
    <PayPalCheckout
      // intent='AUTHORIZE'
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
}

export default App
