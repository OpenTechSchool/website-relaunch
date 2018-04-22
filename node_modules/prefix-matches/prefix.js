'use strict'

var isObject = require('is-object')
var startsWith = require('starts-with')

module.exports = function (input, scripts) {
  var prefixes = input.split('.')
  var depth = 0
  var results = searchForPrefix(scripts, depth, prefixes)
  return results
}

function searchForPrefix(currentScripts, depth, prefixes, propertyChain, results) {
  propertyChain = propertyChain || []
  results = results || []
  Object.keys(currentScripts).forEach(function (key) {
    var isLastPrefix = depth === prefixes.length - 1
    var result = {}
    if (startsWith(key, prefixes[depth])) {
      propertyChain.push(key)
      if (!isLastPrefix && isObject(currentScripts[key])) {
        searchForPrefix(currentScripts[key], depth + 1, prefixes, propertyChain, results)
      } else {
        result[propertyChain.join('.')] = currentScripts[key]
        results.push(result)
      }
      propertyChain.pop()
    }
  })
  if (depth === 0) {
    return results
  }
}
