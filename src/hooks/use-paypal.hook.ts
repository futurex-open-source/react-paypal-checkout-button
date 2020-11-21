/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import { OnApproveDataTypes, UsePayPalOptions } from '../types'
import usePayPalScript from './use-paypal-script.hook'

const usePayPal = (options: UsePayPalOptions) => {
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

  const { scriptState, setScriptState } = usePayPalScript({
    clientId,
    currency,
    onError,
    intent
  })

  const { loading, loaded, errorMessage } = scriptState

  const onRetry = () => {
    setScriptState({
      loaded: false,
      loading: false,
      errorMessage
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

    if (loaded && !loading && !errorMessage && paypalRef?.current) {
      if (!GlobalWindow?.paypal) {
        const errorMessage = 'PayPal button was not loaded successfully...'

        onError && onError(new Error(errorMessage))

        return setScriptState({
          loading: false,
          loaded: false,
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
  }, [scriptState])

  return {
    isLoadingButton: loading && !loaded && !errorMessage,
    buttonLoaded: loaded,
    errorMessage,
    onRetry
  }
}

export default usePayPal
