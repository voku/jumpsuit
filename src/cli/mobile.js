import { log } from './emit'
import cordova from './utils/cordova'
import { CONFIG } from './config'

export default async function mobile (argv) {
  if (!await checkCordovaProject()) {
    await createCordovaProject()
  }
  // TODO: check cordova www is sym linked to output directory
  log("Great! Now install an operating system by running: 'jumpova platform add ios/android'")
}

async function checkCordovaProject () {
  return new Promise((resolve, reject) => {
    try {
      cordova.info()
    } catch (e) {
      if (e) return resolve(false)
      resolve(true)
    }
  })
}

async function createCordovaProject () {
  return new Promise((resolve, reject) => {
    cordova.create('mobile', {
      lib: {
        www: {
          url: CONFIG.outputDir,
          link: CONFIG.outputDir
        }
      }
    }, (err) => {
      if (err) {
        log('Mobile environment found')
      } else {
        log('Creating mobile environment')
      }
      resolve()
    })
  })
}
