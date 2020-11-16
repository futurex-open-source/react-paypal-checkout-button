import React from 'react'

import PayPalCheckout from 'react-paypal-checkout-button'
import 'react-paypal-checkout-button/dist/index.css'

const App = () => {
  return (
    <PayPalCheckout
      clientId='AXo8WDTPKkGnTDyx7K0tP3U4Kx-pLpbs8RFAh2ZVzAT09O9vVdBju3EMMichVoR_peEJgQUXhDClSb0p'
      amount={100}
      currency='USD'
    />
  )
}

export default App
