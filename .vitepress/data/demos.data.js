import fs from 'fs'
import path from 'path'

export default {
  watch: '../../demos/*.vue',
  async load(files) {     
    const data = {}
    for (const file of files) {
      const fileName = path.basename(file)
      const content = fs.readFileSync(file, 'utf-8')
      data[fileName] = content
    }
    return data
  }
}