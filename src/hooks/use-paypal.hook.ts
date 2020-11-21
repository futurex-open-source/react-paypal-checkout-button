/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import { OnApproveDataTypes, UsePayPalOptions } from '../types'
import usePayPalScript from './use-paypal-script.hook'

const usePayPalCheckout = (options: UsePayPalOptions) => {
  const GlobalWindow: any = window

  const {
    clientId,
    intent = 'CAPTURE',
    amount,
    description,
    currency = 'USD',
    purchase_units,
    onSuccess,
    onError,
    paypalRef
  } = options

  const { buttonState, setButtonState } = usePayPalScript({
    clientId,
    currency,
    onError,
    intent
  })

  const { isLoadingButton, buttonLoaded, errorMessage } = buttonState

  const onRetry = () => {
    setButtonState({
      buttonLoaded: false,
      isLoadingButton: false,
      errorMessage: ''
    })
  }

  const createOrder = (data: any, actions: any) => {
    const purchaseUnits = purchase_units?.length
      ? purchase_units
      : [
          {
            description: description || 'payment',
            amount: {
              currency,
              value: amount
            }
          }
        ]

    console.log({ data, actions })
    return actions.order.create({
      intent,
      purchase_units: purchaseUnits
    })
  }

  const errorHandler = (error: any) => {
    console.error({ error })

    onError && onError(error)
  }

  const onApprove = async (data: OnApproveDataTypes, actions: any) => {
    const getOrder = () => {
      if (intent === 'AUTHORIZE') return actions.order.authorize()

      return actions.order.capture()
    }
    const order = await getOrder()

    onSuccess && onSuccess(data, order)
  }

  useEffect(() => {
    // console.log({ scriptState })

    if (
      buttonLoaded &&
      !isLoadingButton &&
      !errorMessage &&
      paypalRef?.current
    ) {
      if (!GlobalWindow?.paypal) {
        const errorMessage =
          'PayPal button was not buttonLoaded successfully...'

        onError && onError(new Error(errorMessage))

        return setButtonState({
          isLoadingButton: false,
          buttonLoaded: false,
          errorMessage
        })
      }

      setTimeout(() => {
        GlobalWindow.paypal
          .Buttons({
            createOrder,
            onApprove,
            onError: errorHandler
          })
          .render(paypalRef.current)
      })
    }
  }, [buttonState])

  return {
    ...buttonState,
    onRetry
  }
}

export default usePayPalCheckout
