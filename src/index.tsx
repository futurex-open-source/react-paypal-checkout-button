/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './styles.module.css'

import {
  OnApproveDataTypes,
  OrderObjectTypes,
  PayPalCheckoutProps
} from './types'

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({
  clientId,
  amount,
  currency = 'USD',
  handleSuccessfulPayment,
  handlePaymentError
}) => {
  const paypalRef = useRef(null)
  const [loadState, setLoadState] = useState({
    loading: false,
    loaded: false,
    error: ''
  })
  const GlobalWindow: any = window

  useEffect(() => {
    if (!clientId) {
      console.error(`Client Id is required`)

      setLoadState((prev) => ({ ...prev, error: 'Client Id is required' }))
    }

    if (!loadState.loading && !loadState.loaded && !loadState.error) {
      setLoadState((prev) => ({ ...prev, loading: true }))

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`

      script.addEventListener('load', () =>
        setLoadState((prev) => ({ ...prev, loading: false, loaded: true }))
      )

      document.body.appendChild(script)

      script.addEventListener('error', () => {
        setLoadState((prev) => ({
          ...prev,
          loading: false,
          loaded: false,
          error: `An error occured while loading script...`
        }))
      })
    }

    if (loadState.loaded && !loadState.loading && !loadState.error) {
      if (!GlobalWindow.paypal) {
        return setLoadState((prev) => ({
          ...prev,
          loading: false,
          loaded: false,
          error: `PayPal doesn't not exist in global scope`
        }))
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
            onApprove: async (data: OnApproveDataTypes, actions: any) => {
              const order: OrderObjectTypes = await actions.order.capture()

              handleSuccessfulPayment && handleSuccessfulPayment(data, order)
            },
            onError: (error: any) => {
              handlePaymentError && handlePaymentError(error)
            }
          })
          .render(paypalRef.current)
      })
    }
  }, [loadState])

  const renderReactPayPal = () => {
    if (!loadState.loaded || loadState.loading || loadState.error) return null

    return <div ref={paypalRef} />
  }

  return (
    <div className='react-paypal-button-container'>{renderReactPayPal()}</div>
  )
}

export default PayPalCheckout
