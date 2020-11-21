/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'

import ErrorContainer from './components/error-container.component'
import Spinner from './components/spinner.component'
import { OnApproveDataTypes, PayPalCheckoutProps } from './types'
import styles from './styles.module.css'
import usePayPalScript from './hooks/use-paypal-script.hook'

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({
  clientId,
  amount,
  currency = 'USD',
  intent = 'CAPTURE',
  handleSuccessfulPayment,
  handleError
}) => {
  const paypalRef = useRef(null)

  // console.log({ intent })

  const GlobalWindow: any = window

  const { loadState, setLoadState } = usePayPalScript({
    clientId,
    currency,
    handleError,
    intent
  })

  const {
    loading,
    loaded,
    error: { errorMessage, shouldRetry }
  } = loadState

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

  const onError = (error: any) => {
    console.error({ error })

    handleError && handleError(error)
  }

  const onApprove = async (data: OnApproveDataTypes, actions: any) => {
    const getOrder = () => {
      if (intent === 'AUTHORIZE') return actions.order.authorize()

      return actions.order.capture()
    }
    const order = await getOrder()

    handleSuccessfulPayment && handleSuccessfulPayment(data, order)
  }

  useEffect(() => {
    // console.log({ loadState })

    if (loaded && !loading && !errorMessage) {
      if (!GlobalWindow.paypal) {
        const errorMessage = "PayPal doesn't not exist in global scope"

        handleError && handleError(new Error(errorMessage))

        return setLoadState({
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
            onError
          })
          .render(paypalRef.current)
      })
    }
  }, [loadState])

  const onRetry = () => {
    setLoadState({
      loaded: false,
      loading: false,
      error: { errorMessage: '', shouldRetry: true }
    })
  }

  const renderReactPayPal = () => {
    if (!loaded && loading && !errorMessage)
      return <Spinner isLoading={loadState.loading} />

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
