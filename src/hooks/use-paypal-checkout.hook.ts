/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import {
  CustomWindow,
  OnApproveDataTypes,
  UsePayPalCheckoutOptions,
  UsePayPalCheckoutValues
} from '../types'
import usePayPalScript from './use-paypal-script.hook'

declare let window: CustomWindow

const usePayPalCheckout = (
  options: UsePayPalCheckoutOptions
): UsePayPalCheckoutValues => {
  const [paypalElement, setPayPalElement] = useState()

  const {
    clientId,
    intent = 'CAPTURE',
    amount,
    description = 'payment',
    currency = 'USD',
    buttonStyles,
    onSuccess,
    onError
  } = options

  const { buttonState, setButtonState } = usePayPalScript({
    clientId,
    currency,
    onError,
    intent,
    paypalElement
  })

  const { isLoadingButton, buttonLoaded, errorMessage } = buttonState

  const paypalRef = (node: any) => setPayPalElement(node)

  const onRetry = () => {
    setButtonState({
      buttonLoaded: false,
      isLoadingButton: false,
      errorMessage: ''
    })
  }

  const createOrder = (_data: any, actions: any) => {
    const purchase_units = [
      {
        description: description,
        amount: {
          currency,
          value: amount
        }
      }
    ]

    return actions.order.create({
      intent,
      purchase_units
    })
  }

  const errorHandler = (error: any) => {
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
    if (buttonLoaded && !isLoadingButton && !errorMessage && paypalElement) {
      if (!window?.paypal) {
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
        window.paypal
          .Buttons({
            ...(buttonStyles && { style: buttonStyles }),
            createOrder,
            onApprove,
            onError: errorHandler
          })
          .render(paypalElement)
      })
    }
  }, [buttonState])

  return {
    ...buttonState,
    onRetry,
    paypalRef
  }
}

export default usePayPalCheckout
