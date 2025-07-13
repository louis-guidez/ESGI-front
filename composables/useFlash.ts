export type FlashMessage = { message: string; type: 'success' | 'error' }

export function useFlash() {
  const flash = useState<FlashMessage | null>('flash', () => null)

  function setFlash(message: string, type: 'success' | 'error' = 'success') {
    flash.value = { message, type }
  }

  function clearFlash() {
    flash.value = null
  }

  return { flash, setFlash, clearFlash }
}
