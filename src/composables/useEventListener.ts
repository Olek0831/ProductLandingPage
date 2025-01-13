import { onMounted, onUnmounted } from 'vue'
import type { EventTarget } from '@/types'

export function useEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener | EventListenerObject,
) {
  onMounted(() => {
    target.addEventListener(event, handler)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}
