import {test, describe, before, after} from "node:test"
import assert from "node:assert"

import app from "./app.js"

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

before(async () =>{
    return new Promise((resolve, reject) =>{
        server = app.listen(PORT, () => resolve())

        server.on ('error', reject)
    })
})

after(async () =>{
    return new Promise ((resolve, reject) =>{
        server.close((err) =>{
            if (err) return reject(err)
            resolve()
        })
    })
})

describe('GET /products', () =>{
    test('Debe responder 200 y un array de producstos', async () =>{
        const res = await fetch(`${BASE_URL}/products`)
        assert.strictEqual(res.status, 200)

        const json = await res.json()
        assert.ok(Array.isArray(json.data), 'repuesta del array')
    })
})