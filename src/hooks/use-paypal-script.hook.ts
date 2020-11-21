import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { UsePayPalScriptOptions } from '../types'

const usePayPalScript = ({
  clientId,
  currency,
  handleError,
  intent
}: UsePayPalScriptOptions) => {
  const INTENT =
    intent === 'AUTHORIZE' ? `&intent=${intent?.toLocaleLowerCase()}` : ''

  const [loadState, setLoadState] = useState({
    loading: false,
    loaded: false,
    error: {
      errorMessage: '',
      shouldRetry: false
    }
  })

  const {
    loading,
    loaded,
    error: { errorMessage }
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
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}${INTENT}`

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
            errorMessage: `An error occured while loading paypal smart buttons`,
            shouldRetry: true
          }
        })
      })
    }
  }, [loadState])

  return {
    loadState,
    setLoadState
  }
}

export default usePayPalScript
