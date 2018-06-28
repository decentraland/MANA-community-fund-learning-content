import { registerAPI, API, exposeMethod } from '../../../lib/host'
import { EventDispatcher, EventDispatcherBinding } from '../../../lib/common/core/EventDispatcher'

const messageBus = new EventDispatcher()

@registerAPI('MessageBus')
export class MessageBusManager extends API {
  joinedTo: EventDispatcherBinding[] = []

  @exposeMethod
  async getChannel(name: string, uid: string, options: any) {
    const id = (Math.random() * 100000000).toFixed(0)

    const key = 'Broadcast_' + id

    this.joinedTo.push(
      messageBus.on(name, (message: any) => {
        try {
          this.options.notify(key, message)
        } catch (e) {
          console.error(e)
        }
      })
    )

    this.options.expose(key, async (message: any) => {
      messageBus.emit(name, message)
    })

    return { id }
  }

  componentWillUnmount() {
    // TODO: test component will unmount
    this.joinedTo.forEach($ => $.off())
    this.joinedTo.length = 0
  }
}
