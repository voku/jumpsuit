import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import _ from 'lodash'
import { CONFIG } from '../utils/config'

export default async function (argv) {
  global.IS_SERVERSIDE = true
  global.SERVERSIDE_PATH = '/test'
  const app = require(path.resolve(CONFIG.outputDir, 'app.js')).default

  let appPaths = (function flattenReactChildrenToArray (nodeChildren, paths = [], currentPath = '/') {
    React.Children.forEach(nodeChildren, (childNode) => {
      if (childNode.props.path) {
        currentPath += '/' + childNode.props.path
        paths.push(currentPath)
      }
      if (childNode && childNode.props && childNode.props.children) {
        flattenReactChildrenToArray(childNode.props.children, paths, currentPath)
      }
      if (childNode && childNode._shadowChildren) {
        flattenReactChildrenToArray(childNode._shadowChildren, paths, currentPath)
      }
    })
    return paths
  })(app)

  const slashRegex = /\/\//

  appPaths = appPaths.map(d => {
    while (d.match(slashRegex)) {
      d = d.replace(slashRegex, '/')
    }
    return d
  })

  appPaths = _.map(_.uniq(appPaths), d => `.${d}`)

  console.log(appPaths)


  const appHTML = ReactDOM.renderToString(app)
  const html = fs.readFileSync(path.resolve(CONFIG.outputDir, 'index.html'), 'utf8')
  const newHtml = html.replace(appHTML, '').replace(/id=['"]app['"](.+)?></, `id='app'$1>${appHTML}<`)
  fs.writeFileSync(path.resolve(CONFIG.outputDir, 'index.html'), newHtml)
}
