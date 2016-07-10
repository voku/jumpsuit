import { log } from './emit'
import taco from './utils/taco'
import { CONFIG } from './config'

export default async function mobile (argv) {
  await createTacoProject()
  log("Taco is ready to go! Use 'jumptaco [command]' to manage your taco app as you normally would \n")
}

async function createTacoProject () {
  return taco(`create mobile --link-to ${CONFIG.outputDir}`)
    .then((res) => {
      log('Taco project created')
    })
    .catch((err) => {
      if (err.code === 5536) {
        log('Taco project found')
      }
    })
}
