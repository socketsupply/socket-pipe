import { EventEmitter } from 'events'

class Pipe extends EventEmitter {
  constructor (opts) {
    super()

    this.json = opts.json === true

    if (!opts.json) {
      process.stdin.on('data', data => {
        this.emit('data', data)
      })
      return
    }

    let buf = ''

    const parse = msg => {
      try {
        const json = JSON.parse(msg)
        this.emit('data', json)
      } catch (err) {
        this.emit('warning', err)
      }
    }

    process.stdin.on('data', data => {
      const messages = data.split('\n')

      if (messages.length === 1) {
        buf += data
        return
      }

      parse(buf + messages[0])

      for (let i = 1; i < messages.length - 1; i++) {
        parse(messages[i])
      }

      buf = messages[messages.length - 1]
    })

    process.stdin.setEncoding('utf8')
    process.stdin.resume()
  }

  async write (data) {
    if (data.constructor.name === 'Message') {
      const str = data.toString()
      return new Promise(resolve => process.stdout.write(str, resolve))
    }

    if (!this.json) {
      return new Promise(resolve => process.stdout.write(data, resolve))
    }

    process.stdout.write(data)
  }
}

export { Pipe }
