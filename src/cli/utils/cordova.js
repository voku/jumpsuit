import cordova from 'cordova'

console.log(cordova)
export default cordova

export async function run (args) {
  const argv = args.split(' ')
  argv.unshift('', '')
  return await cordova.cli(argv)
}
