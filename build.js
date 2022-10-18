const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const srcDir = 'src'
const destDir = 'build'

try {
  fs.rmSync('./build', { recursive: true, force: true })
  fs.mkdirSync(destDir)
  exec(`rsync -ar ${srcDir}/ ${destDir} && rm -rf ${destDir}/__tests__`)
} catch (err) {
  console.error(err)
}
