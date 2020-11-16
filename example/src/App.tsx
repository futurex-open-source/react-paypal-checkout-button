import React from 'react'

import PayPalCheckout from 'react-paypal'
import 'react-paypal/dist/index.css'

const App = () => {
  return (
    <PayPalCheckout
      clientId='AXo8WDTPKkGnTDyx7K0tP3U4Kx-pLpbs8RFAh2ZVzAT09O9vVdBju3EMMichVoR_peEJgQUXhDClSb0p'
      amount={100}
      currency='USD'
      handleSuccessfulPayment={(data, order) => {
        console.log({ data, order })
      }}
    />
  )
}

export default App
