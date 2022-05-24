const { Command } = require('commander')
const { check } = require('./browser')

async function main() {
  const program = new Command()

  program
    .name('adblock-checker')
    .description('Checks whether resource is blocked on the website by adblockers')
    .requiredOption('-w, --website <string>', 'URL of the website you\'d like to test')
    .requiredOption('-r, --resource <string>', 'URL of the resource you\'d like to test')
    .parse()

  const { website, resource } = program.opts()
  const result = await check(website, resource)
  const output = JSON.stringify(result, null, 2)
  process.stdout.write(output)
}

main()
