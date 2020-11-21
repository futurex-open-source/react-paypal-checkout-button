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
import { useRef } from 'react'
import { usePayPalCheckout } from 'react-paypal-checkout-button'

const paypalRef = useRef(null)

const {
  isLoadingButton,
  errorMessage,
  buttonLoaded,
  onRetry
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


  if (isLoadingButton) return <p>Loading...</p>

  if (errorMessage)
    return (
      <div>
        <p>{errorMessage}</p>

        <button onClick={onRetry}>Try Again</button>
      </div>
    )

  return buttonLoaded ? <div ref={paypalRef} /> : null
})
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
type UsePayPalCheckoutOptions = PayPalCheckoutProps & {
  paypalRef: any
}

export type ButtonState = {
  isLoadingButton: boolean
  buttonLoaded: boolean
  errorMessage: string
}

export type UsePayPalCheckoutValues = ButtonState & {
  onRetry: () => void
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
