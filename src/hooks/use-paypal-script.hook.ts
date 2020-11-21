import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { UsePayPalScriptOptions } from '../types'

const usePayPalScript = ({
  clientId,
  currency,
  onError,
  intent
}: UsePayPalScriptOptions) => {
  const INTENT = intent ? `&intent=${intent?.toLocaleLowerCase()}` : ''

  const [scriptState, setScriptState] = useState({
    loading: false,
    loaded: false,
    errorMessage: ''
  })

  const { loading, loaded, errorMessage } = scriptState

  useEffect(() => {
    if (errorMessage) return

    if (!clientId) {
      const errorMessage = 'Client Id is required to load PayPal Smart Button'
      onError && onError(new Error(errorMessage))

      console.error(errorMessage)

      return setScriptState({
        loading: false,
        loaded: false,
        errorMessage
      })
    }

    // console.log({ ScriptState })

    if (!loading && !loaded && !errorMessage) {
      setScriptState((prev) => ({ ...prev, loading: true }))

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}${INTENT}`

      script.addEventListener('load', () =>
        setScriptState((prev) => ({ ...prev, loading: false, loaded: true }))
      )

      document.body.appendChild(script)

      script.addEventListener('error', (error) => {
        console.error(error)

        onError && onError(error)

        return setScriptState({
          loading: false,
          loaded: false,
          errorMessage: `An error occured while loading paypal smart buttons`
        })
      })
    }
  }, [scriptState])

  return {
    scriptState,
    setScriptState
  }
}

export default usePayPalScript
