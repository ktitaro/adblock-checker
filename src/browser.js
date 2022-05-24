const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

async function check(website, resource) {
  const result = {}
  const extensionsDir = path.resolve(__dirname, '..', 'extensions')
  const extensionsPaths = fs.readdirSync(extensionsDir)

  for (const extensionPath of extensionsPaths) {
    const extension = path.resolve(extensionsDir, extensionPath)
    const isDirectory = fs.lstatSync(extension).isDirectory()
    if (!isDirectory) continue

    const stats = await examine(website, resource, extension)
    result[extensionPath] = stats
  }

  return result
}

async function examine(website, resource, extension) {
  const dataDir = '/tmp/adblock-checker-chrome-data'
  const context = await chromium.launchPersistentContext(dataDir, {
    headless: false,
    args: [
      `--load-extension=${extension}`,
      `--disable-extensions-except=${extension}`,
    ],
  })

  const stats = { total: 0, blocked: 0 }
  const page = await context.newPage()

  page.on('request', async (request) => {
    if (request.url() !== resource) return

    const response = await request.response()
    const failure = request.failure()
    stats.total += 1

    if (!response && failure.errorText === 'net::ERR_BLOCKED_BY_CLIENT') {
      stats.blocked += 1
    }
  })

  await page.goto(website, { waitUntil: 'networkidle' })
  await context.close()
  return stats
}

module.exports = {
  check,
}
