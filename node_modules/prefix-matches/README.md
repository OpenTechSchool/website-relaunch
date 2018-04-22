Prefix Matches
---

Find matching keys in a given object, for a given prefix string

**Warning**: experimental

## Installation

	npm i --save prefix-matches

then, in your scripts:

```js
const prefixMatches = require('prefix-matches')
```

## Example

```js
const prefixMatches = require('prefix-matches')

// Resolves simple cases
prefixMatches('w', {
	watch: 'watch things',
	build: 'build things'
}) // => [{ watch: 'watch things' }]

// Does not flatten result set
prefixMatches('w', {
	watch: {
		js: 'watch javascript',
		css: 'watch css'
	},
	build: 'build things'
}) // => [{ watch: { js: 'watch javascript', css: 'watch css' }}]

// Resolves nested prefixes
prefixMatches('w.j', {
	watch: {
		js: 'watch javascript',
		css: 'watch css'
	},
	write: {
		js: 'write javascript'
	}
}) // => [{ 'watch.js': 'watch javascript' }, { 'write.js': 'write javascript' }]

// ... and so on
prefixMatches('b.f.j', {
	build: {
		frontend: {
			js: 'build javascript',
			css: 'build css'
		}
	}
}) // => [{ 'build.frontend.js': 'build javascript' }]
```

## Why?

To attempt better prefixing support for the [package-scripts](https://github.com/kentcdodds/p-s) project.

## Tests

A basic test suite has been authored in [AVA](https://github.com/sindresorhus/ava), used for its terrifying speed. To run it:

	npm test
