# React-Paypal-Checkout-Button

> A very simple, easy to use React button component for implementing paypal checkout

[![NPM](https://img.shields.io/npm/v/react-paypal-checkout-button.svg)](https://www.npmjs.com/package/react-paypal-checkout-button) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```
npm install --save react-paypal-checkout-button
```

or

```
yarn add react-paypal-checkout-button
```

## Usage

```tsx
import React from 'react'

import PayPalCheckout from 'react-paypal-checkout-button'
import 'react-paypal/dist/index.css'

const App = () => {
  return (
    <PayPalCheckout
      clientId='Ae*****WD*******************'
      amount={100}
      currency='USD'
      handleSuccessfulPayment={(data, order) => {
        console.log({ data, order })
      }}
      handlePaymentError={(error) => {
        console.log({ error })
      }}
    />
  )
}

export default App
```

### Types

All relevant types are bundled and exported with the npm package

```
type PayPalCheckoutProps = {
  clientId: string
  amount: number
  currency: string
  handleSuccessfulPayment?: (
    data: OnApproveDataTypes,
    order: OrderObjectTypes
  ) => void
  handlePaymentError?: (error: any) => void
}
```

## License

MIT © [UcheSylvester](https://github.com/UcheSylvester)
