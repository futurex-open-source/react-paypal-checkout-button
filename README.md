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
<<<<<<< HEAD
import 'react-paypal-checkout-button/dist/index.css'
=======
import 'react-paypal/dist/index.css'
>>>>>>> main

const App = () => {
  return (
    <PayPalCheckout
<<<<<<< HEAD
      clientId='axew*******************&*&******'
=======
      clientId='Ae*****WD*******************'
>>>>>>> main
      amount={100}
      currency='USD'
      handleSuccessfulPayment={(data, order) => {
        console.log({ data, order })
      }}
<<<<<<< HEAD
      handleError={(error) => {
=======
      handlePaymentError={(error) => {
>>>>>>> main
        console.log({ error })
      }}
    />
  )
<<<<<<< HEAD
=======
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
>>>>>>> main
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

## Contributing

we hope to make this package the first option whenever it comes to implemeting paypal checkout, so you are always welcome to contribute to this project.

- Fork it!
- Create your feature branch: `git checkout -b feature-name`
- commit your changes: `git commit -am 'Some commit message`
- Push to the branch: `git push origin feature-name`
- Submit a pull request :smiling_face_with_three_hearts::muscle:

## License

MIT © [UcheSylvester](https://github.com/UcheSylvester)
