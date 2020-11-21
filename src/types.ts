/* eslint-disable camelcase */

export type IntentOptions = 'CAPTURE' | 'AUTHORIZE'

export type OnApproveDataTypes = {
  orderID: string
  payerID: string
}

export type Payer = {
  address: { country_code: string }
  email_address: string
  name: { given_name: string; sur_name: string }
  payer_id: string
}

export type OrderObjectTypes = {
  create_time: string
  id: string
  intent: string
  links: Array<object>
  payer: Payer
  purchase_units: Array<object>
}

export type PurchaseUnit = {
  description?: string
  amount: { currency?: string; value: number }
}

export type Size =
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55

export type StylesOptions = {
  layout?: 'vertical' | 'horizontal'
  color?: 'blue' | 'gold' | 'silver' | 'white' | 'black'
  shape?: 'rect' | 'pill'
  height?: Size
  label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'installment'
  tagline?: boolean
}

export type PayPalCheckoutProps = {
  intent?: IntentOptions
  clientId?: string
  amount: number
  currency?: string
  description?: string
  buttonStyles?: StylesOptions
  onSuccess?: (data: OnApproveDataTypes, order: OrderObjectTypes) => void
  onError?: (error: any) => void
}

export type ErrorContainerProps = {
  errorMessage: string
  onRetry: () => void
  // shouldRetry: boolean
}

export type SpinnerProps = {
  isLoading: boolean
}

export type UsePayPalScriptOptions = {
  clientId?: string
  currency: string
  intent?: IntentOptions
  onError?: (error: any) => void
}

export type UsePayPalCheckoutOptions = PayPalCheckoutProps & {
  paypalRef: any
}
