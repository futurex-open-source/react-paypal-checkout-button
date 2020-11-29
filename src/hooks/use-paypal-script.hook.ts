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

  useEffect(() => {
    if (errorMessage || !paypalElement) return

    if (!clientId) {
      console.log({ buttonState })

      const errorMessage = 'Client Id is required to load PayPal Smart Button'

      onError && onError(new Error(errorMessage))

      console.error(errorMessage)

      return setButtonState({
        isLoadingButton: false,
        buttonLoaded: false,
        errorMessage
      })
    }

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

      document.body.appendChild(script)

      script.addEventListener('error', (error) => {
        console.error(error)

        onError && onError(error)

        return setButtonState({
          isLoadingButton: false,
          buttonLoaded: false,
          errorMessage: `An error occured while isLoadingButton paypal smart buttons`
        })
      })
    }
  }, [buttonState, paypalElement])

  return {
    buttonState,
    setButtonState
  }
}

export default usePayPalScript
