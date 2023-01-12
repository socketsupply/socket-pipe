import { Message } from '@socketsupply/socket-api/ipc.js'
import { Pipe } from '../index.js'

const pipe = new Pipe({ json: true })

pipe.on('data', data => {
  pipe.write(Message.from('stdout', data))
})
