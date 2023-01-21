A simple pipe that connects Node with Socket and shows you how to
construct ipc messages for things like writing to stdout or setting
the title of a window from Node.

```js
import { Message } from '@socketsupply/socket-api/ipc.js'
import { Pipe } from '@socketsupply/socket-pipe'

const pipe = new Pipe({ json: true })

pipe.on('data', json => {
  pipe.write(Message.from('stdout', json))
})
```
