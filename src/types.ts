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

export type PayPalCheckoutProps = {
  clientId?: string
  amount: number
  currency?: string
  intent?: IntentOptions
  handleSuccessfulPayment?: (
    data: OnApproveDataTypes,
    order: OrderObjectTypes
  ) => void
  handleError?: (error: any) => void
}

export type ErrorContainerProps = {
  errorMessage: string
  onRetry: () => void
  shouldRetry: boolean
}

export type SpinnerProps = {
  isLoading: boolean
}

export type UsePayPalScriptOptions = {
  clientId?: string
  currency: string
  intent?: IntentOptions
  handleError?: (error: any) => void
}
