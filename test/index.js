import { test } from 'tapzero'
import { spawn } from 'child_process'

test('json pipe', async t => {
  await new Promise(resolve => {
    const p = spawn('node', ['test/json.js'])

    p.on('error', e => {
      t.fail(true, e.message)
      process.exit(1)
    })

    p.stderr.on('data', d => {
      t.fail(true, d.toString())
      process.exit(1)
    })

    p.stdout.on('data', d => {
      t.equal(d.toString(), 'ipc://stdout?hello=true', 'received data piped from sub process')
      resolve()
    })

    p.stdin.write('{"hello":true}\n')
    setInterval(() => {}, 512)
  })
})

test('cleanup', t => {
  process.exit(0)
})
