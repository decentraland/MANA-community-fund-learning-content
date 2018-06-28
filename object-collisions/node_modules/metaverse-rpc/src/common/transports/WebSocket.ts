import { ScriptingTransport } from '../json-rpc/types'

export interface IWebSocketEventMap {
  close: any
  error: any
  message: { data: any }
  open: any
}

/**
 * This interface should be compatible with the Browsers interface
 * and npm ws package for servers
 */
export interface IWebSocket {
  CONNECTING: number
  OPEN: number
  CLOSING: number
  CLOSED: number

  readyState: number

  close(code?: number, data?: string): void

  send(data: any, cb?: (err: Error) => void): void
  send(data: any, options: any, cb?: (err: Error) => void): void

  terminate?(): void

  addEventListener<K extends keyof IWebSocketEventMap>(
    type: K,
    listener: (ev: IWebSocketEventMap[K]) => any,
    options?: any
  ): void
}

export function WebSocketTransport(socket: IWebSocket): ScriptingTransport {
  const queue: (string | Uint8Array | ArrayBuffer | SharedArrayBuffer | Buffer)[] = []

  socket.addEventListener('open', function() {
    flush()
  })

  function flush() {
    if (socket.readyState === socket.OPEN) {
      queue.forEach($ => send($))
      queue.length = 0
    }
  }

  function send(msg: string | Uint8Array | ArrayBuffer | SharedArrayBuffer | Buffer) {
    if (typeof msg === 'string') {
      socket.send(msg, { binary: false })
    } else if (msg instanceof Uint8Array || msg instanceof ArrayBuffer || msg instanceof SharedArrayBuffer) {
      // tslint:disable-next-line:semicolon
      ;(socket as any).binaryType = 'arraybuffer'
      socket.send(msg, { binary: true })
    }
  }

  const api: ScriptingTransport = {
    onConnect(handler) {
      if (socket.readyState === socket.OPEN) {
        handler()
      } else {
        socket.addEventListener('open', () => handler(), { once: true })
      }
    },
    onError(handler) {
      socket.addEventListener('error', (err: ErrorEvent) => handler(err.error))
    },
    onMessage(handler) {
      socket.addEventListener('message', (message: { data: any }) => {
        handler(message.data)
      })
    },
    sendMessage(message) {
      const toSend = message instanceof Uint8Array ? message.buffer : message

      if (socket.readyState === socket.OPEN) {
        send(toSend)
      } else {
        queue.push(toSend)
      }
    },
    close() {
      socket.close()
    }
  }

  return api
}
