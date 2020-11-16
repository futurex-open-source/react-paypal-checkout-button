/* eslint-disable camelcase */

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
  intent: 'CAPTURE' | string
  links: Array<object>
  payer: Payer
  purchase_units: Array<object>
}

export type PayPalCheckoutProps = {
  clientId: string
  amount: number
  currency: string
  handleSuccessfulPayment?: (
    data: OnApproveDataTypes,
    order: OrderObjectTypes
  ) => void
  handlePaymentError?: (error: any) => void
}

export type ErrorContainerProps = {
  errorMessage: string
  onRetry: () => void
}

export type SpinnerProps = {
  isLoading: boolean
}
