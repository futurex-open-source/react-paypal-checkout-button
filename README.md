# React-Paypal-Checkout-Button

> A very simple, easy to use React button component for implementing paypal checkout, now enhanced with the power of Custom Hooks 🔥 🔥

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

#### Hooks

```tsx
import React, { useRef } from 'react'
import { usePayPalCheckout } from 'react-paypal-checkout-button'


const App = () => {


const {
  isLoadingButton,
  errorMessage,
  buttonLoaded,
  onRetry,
  paypalRef
} = usePayPalCheckout({
  clientId: 'a*****************************',
  paypalRef,
  amount: 100,
  currency: 'USD',
  onSuccess: (data, order) => {
    console.log(data, order)
  },
  onError: (error) => {
    console.log(error)
  }


  return (
    {isLoadingButton && <h3>loading..</h3>}

    <div ref={paypalRef} />
  )
})

export default App
```

#### Components

```tsx
import React from 'react'

import PayPalCheckout from 'react-paypal-checkout-button'
import 'react-paypal-checkout-button/dist/index.css'

const App = () => {
  return (
    <PayPalCheckout
      clientId='a*****************************'
      amount={100}
      currency='USD'
      onSuccess={(data, order) => {
        console.log(data, order)
      }}
      onError={(error) => {
        console.log(error)
      }}
    />
  )
}

export default App
```

### Types

All relevant types are bundled and exported with the npm package

```
/********PayPalCheckout Types**********/
type type PayPalCheckoutProps = {
  intent?: IntentOptions // 'CAPTURE' | 'AUTHORIZE'
  clientId?: string
  amount: number
  currency?: string
  description?: string
  buttonStyles?: StylesOptions
  onSuccess?: (data: OnApproveDataTypes, order: OrderObjectTypes) => void
  onError?: (error: any) => void
}


/********usePayPalCheckout Types**********/
type UsePayPalCheckoutOptions = PayPalCheckoutProps

export type ButtonState = {
  isLoadingButton: boolean
  buttonLoaded: boolean
  errorMessage: string
}

export type UsePayPalCheckoutValues = ButtonState & {
  onRetry: () => void,
  paypalRef: (node: ReactElement | HTMLElement | null | undefined) => void
}



```

## Contributing

we hope to make this package the first option whenever it comes to implemeting paypal checkout, so you are always welcome to contribute to this project.

- Fork it!
- Create your feature branch: `git checkout -b feature-name`
- commit your changes: `git commit -am 'Some commit message`
- Push to the branch: `git push origin feature-name`
- Submit a pull request :muscle:
- Add your username to the [contributors' list](CONTRIBUTING.md) 😄 🥰

## License

MIT © [UcheSylvester](https://github.com/UcheSylvester)
