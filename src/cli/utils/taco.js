import taco from 'taco-cli'

export default async function run (args) {
  const argv = args.split(' ')
  return await taco.runWithArgs(argv)
}
