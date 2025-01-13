import { describe, it, expect, vi } from 'vitest'

import { useEventListener } from '@/composables/useEventListener'
import { withSetup } from '../__helpers__/withSetup'

describe('useEventListener', () => {
  it('registers event listener when app is mounted, and removes it when app is unmounted', async () => {
    const eventHandler = vi.fn()
    const [, app] = withSetup(() => useEventListener(window, 'click', eventHandler))
    await window.dispatchEvent(new Event('click'))

    expect(eventHandler).toHaveBeenCalledOnce()

    app.unmount()

    await window.dispatchEvent(new Event('click'))
    expect(eventHandler).toHaveBeenCalledTimes(1) //because was already called once - app unmounts, funcion is not called
  })
})
