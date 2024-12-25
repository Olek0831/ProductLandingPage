import { describe, it, expect } from 'vitest'

describe('main script', () => {
  it('should mount app', async () => {
    document.body.innerHTML = '<div id="app"></div>'

    await import('@/main.ts')

    expect(document.querySelector('#app')!.firstChild).toBeDefined()
    expect(document.querySelector('#app')!.firstChild).not.toBeNull()
  })
})
