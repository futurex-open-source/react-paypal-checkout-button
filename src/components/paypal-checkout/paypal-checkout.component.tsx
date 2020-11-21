/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import usePayPalScript from '../../hooks/use-paypal-script.hook'
import { OnApproveDataTypes, PayPalCheckoutProps } from '../../types'
import ErrorContainer from '../error-container.component'
import Spinner from '../spinner.component'

import styles from '../../styles.module.css'

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({
  clientId,
  amount,
  currency = 'USD',
  intent = 'CAPTURE',
  onSuccess,
  onError
}) => {
  const paypalRef = useRef(null)

  // console.log({ intent })

  const GlobalWindow: any = window

  const { scriptState, setScriptState } = usePayPalScript({
    clientId,
    currency,
    onError,
    intent
  })

  const {
    loading,
    loaded,
    error: { errorMessage, shouldRetry }
  } = scriptState

  const createOrder = (data: any, actions: any) => {
    console.log({ data, actions })
    return actions.order.create({
      intent,
      purchase_units: [
        {
          description: 'Payment',
          amount: {
            currency,
            value: amount
          }
        }
      ]
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

    if (loaded && !loading && !errorMessage) {
      if (!GlobalWindow.paypal) {
        const errorMessage = "PayPal doesn't not exist in global scope"

        onError && onError(new Error(errorMessage))

        return setScriptState({
          loading: false,
          loaded: false,
          error: {
            errorMessage,
            shouldRetry: true
          }
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

  const onRetry = () => {
    setScriptState({
      loaded: false,
      loading: false,
      error: { errorMessage: '', shouldRetry: true }
    })
  }

  const renderReactPayPal = () => {
    if (!loaded && loading && !errorMessage)
      return <Spinner isLoading={scriptState.loading} />

    if (errorMessage)
      return (
        <ErrorContainer
          errorMessage={errorMessage}
          onRetry={onRetry}
          shouldRetry={shouldRetry}
        />
      )

    return <div ref={paypalRef} />
  }

  return <div className={styles.container}>{renderReactPayPal()}</div>
}

export default PayPalCheckout
