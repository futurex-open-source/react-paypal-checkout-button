import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { ButtonState, UsePayPalScriptOptions } from '../types'

const usePayPalScript = ({
  clientId,
  currency,
  onError,
  intent,
  paypalElement
}: UsePayPalScriptOptions) => {
  const INTENT = intent ? `&intent=${intent?.toLocaleLowerCase()}` : ''

  const [buttonState, setButtonState] = useState<ButtonState>({
    isLoadingButton: false,
    buttonLoaded: false,
    errorMessage: ''
  })

  const { isLoadingButton, buttonLoaded, errorMessage } = buttonState

  const handleError = (errorMessage: string) => {
    onError && onError(new Error(errorMessage))
    console.error(errorMessage)

    return setButtonState({
      isLoadingButton: false,
      buttonLoaded: false,
      errorMessage
    })
  }

  useEffect(() => {
    if (errorMessage || !paypalElement) return

    // user did not pass a clientId
    if (!clientId)
      return handleError('Client Id is required to load PayPal Smart Button')

    if (!isLoadingButton && !buttonLoaded && !errorMessage) {
      setButtonState((prev) => ({ ...prev, isLoadingButton: true }))

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}${INTENT}`

      script.addEventListener('load', () =>
        setButtonState((prev) => ({
          ...prev,
          isLoadingButton: false,
          buttonLoaded: true
        }))
      )

      // when there is an error
      script.addEventListener('error', () =>
        handleError(`An error occured while loading paypal smart buttons`)
      )

      // finally append the script to the body
      document.body.appendChild(script)
    }
  }, [buttonState, paypalElement])

  return {
    buttonState,
    setButtonState
  }
}

export default usePayPalScript
