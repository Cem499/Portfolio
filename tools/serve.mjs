// Serves a build folder the way Render does (exact paths, 404.html with status 404, gzip).
// node tools/serve.mjs [dir=dist] [port=4173]
import path from 'node:path'
import { createStaticServer, listen, ROOT } from './lib.mjs'

const [dir = 'dist', port = '4173'] = process.argv.slice(2)
const { port: bound } = await listen(createStaticServer(path.resolve(ROOT, dir)), Number(port))
console.log(`${dir}/ läuft wie auf Render: http://localhost:${bound}/  (Ctrl+C beendet)`)
