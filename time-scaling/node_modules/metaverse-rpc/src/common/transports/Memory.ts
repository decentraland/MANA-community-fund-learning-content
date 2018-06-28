import { ScriptingTransport } from '../json-rpc/types'
import { EventDispatcher } from '../core/EventDispatcher'

export function MemoryTransport() {
  const clientEd = new EventDispatcher()
  const serverEd = new EventDispatcher()

  function configureMemoryTransport(receiver: EventDispatcher, sender: EventDispatcher): ScriptingTransport {
    return {
      sendMessage(message) {
        sender.emit('message', message)
      },

      close() {
        sender.emit('close')
      },

      onMessage(handler) {
        receiver.on('message', handler)
      },

      onClose(handler) {
        receiver.on('close', handler)
      },

      onError(handler) {
        receiver.on('error', handler)
      },

      onConnect(handler) {
        setInterval(handler, 16)
      }
    }
  }

  const client = configureMemoryTransport(clientEd, serverEd)
  const server = configureMemoryTransport(serverEd, clientEd)

  return {
    client,
    server
  }
}
