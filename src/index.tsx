/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import ErrorContainer from './components/error-container.component'
import Spinner from './components/spinner.component'
import { PayPalCheckoutProps } from './types'
import styles from './styles.module.css'

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({
  clientId,
  amount,
  currency = 'USD',
  handleSuccessfulPayment,
  handleError
}) => {
  const paypalRef = useRef(null)

  const [loadState, setLoadState] = useState({
    loading: false,
    loaded: false,
    error: {
      errorMessage: '',
      shouldRetry: false
    }
  })
  const GlobalWindow: any = window

  const {
    loading,
    loaded,
    error: { errorMessage, shouldRetry }
  } = loadState

  useEffect(() => {
    if (errorMessage) return

    if (!clientId) {
      const errorMessage = 'Client id is missing'
      handleError && handleError(new Error(errorMessage))

      console.error(errorMessage)

      return setLoadState({
        loading: false,
        loaded: false,
        error: {
          errorMessage,
          shouldRetry: false
        }
      })
    }

    // console.log({ loadState })

    if (!loading && !loaded && !errorMessage) {
      setLoadState((prev) => ({ ...prev, loading: true }))

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`

      script.addEventListener('load', () =>
        setLoadState((prev) => ({ ...prev, loading: false, loaded: true }))
      )

      document.body.appendChild(script)

      script.addEventListener('error', (error) => {
        console.error(error)

        handleError && handleError(error)

        return setLoadState({
          loading: false,
          loaded: false,
          error: {
            errorMessage: `An error occured while loading script...`,
            shouldRetry: true
          }
        })
      })
    }

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
            createOrder: (data: any, actions: any) => {
              console.log({ data, actions })
              return actions.order.create({
                intent: 'CAPTURE',
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
            },
            onApprove: async (data: any, actions: any) => {
              const order = await actions.order.capture()

              handleSuccessfulPayment && handleSuccessfulPayment(data, order)
            },
            onError: (error: any) => {
              console.error(error)

              handleError && handleError(error)
            }
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
