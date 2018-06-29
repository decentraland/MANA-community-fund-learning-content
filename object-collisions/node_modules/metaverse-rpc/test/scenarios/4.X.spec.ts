import { testInWorker, testWithTransport } from './support/Helpers'
import { Logger, Methods, Test } from './support/Commons'
import * as assert from 'assert'
import { WebSocketTransport } from '../../lib/client'

describe('Failure and exception transport (Server uses JSON)', () => {
  testInWorker('test/out/fixtures/4.0.Failures.js', {
    plugins: [Logger, Methods, Test],
    validateResult: result => {
      assert.equal(result.code, -32603)
      assert.equal(result.data.message, 'A message')
    },
    log: false,
    sendEncoding: 'JSON'
  })

  testInWorker('test/out/fixtures/4.1.Methods.js', {
    plugins: [Logger, Methods, Test],
    log: false,
    sendEncoding: 'JSON'
  })

  testInWorker('test/out/fixtures/4.2.UnknownComponent.js', {
    plugins: [],
    log: false,
    sendEncoding: 'JSON'
  })

  testInWorker('test/out/fixtures/4.3.Methods.msgpack.js', {
    plugins: [Logger, Methods, Test],
    log: false,
    sendEncoding: 'JSON'
  })

  testInWorker('test/out/fixtures/4.4.Failures.msgpack.js', {
    plugins: [Logger, Methods, Test],
    log: true,
    sendEncoding: 'JSON'
  })
})

describe('Failure and exception transport (Server uses msgpack)', () => {
  testInWorker('test/out/fixtures/4.0.Failures.js', {
    plugins: [Logger, Methods, Test],
    validateResult: result => {
      assert.equal(result.code, -32603)
      assert.equal(result.data.message, 'A message')
    },
    log: false,
    sendEncoding: 'msgpack'
  })

  testInWorker('test/out/fixtures/4.1.Methods.js', {
    plugins: [Logger, Methods, Test],
    log: false,
    sendEncoding: 'msgpack'
  })

  testInWorker('test/out/fixtures/4.2.UnknownComponent.js', {
    plugins: [],
    log: false,
    sendEncoding: 'msgpack'
  })

  testInWorker('test/out/fixtures/4.3.Methods.msgpack.js', {
    plugins: [Logger, Methods, Test],
    log: false,
    sendEncoding: 'msgpack'
  })

  testInWorker('test/out/fixtures/4.4.Failures.msgpack.js', {
    plugins: [Logger, Methods, Test],
    log: false,
    sendEncoding: 'msgpack'
  })
})

describe('WebSocket transport', () => {
  it('tests the worker thru the socket', async () => {
    await testWithTransport(
      'test/out/fixtures/4.4.Failures.JSON.js',
      {
        plugins: [Logger, Methods, Test],
        log: true
      },
      WebSocketTransport(new WebSocket(`ws://${location.host}/test`))
    )
  })
})
