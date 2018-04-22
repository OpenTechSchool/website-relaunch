# OpenTechSchool - [Website](http://www.opentechschool.org)

[![Join the chat at https://gitter.im/OpenTechSchool/www.opentechschool.org](https://badges.gitter.im/OpenTechSchool/www.opentechschool.org.svg)](https://gitter.im/OpenTechSchool/www.opentechschool.org?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

```
The source code behind the new OTS main web site.
```

# blaupause

This website is built on top of blaupause hugo starterkit, for more info about the scripts and buil process used, check blaupause website.
> blaupause is a [hugo](https://gohugo.io) starter kit based on npm scripts, webpack and postcss. It


## Setup

This site is built using [Hugo](https://gohugo.io/), a static site generator.
You can clone the project and start the server running:

```sh
git clone git@github.com:OpenTechSchool/website-relaunch.git
git checkout hugo-starterkit
npm install
npm start
open `http://localhost:5000`
```

## Tasks & Task Configuration

Tasks are managed via [nps](https://github.com/kentcdodds/nps) and live in `package-scripts.js`. The following tasks are exposed in `package.json`:

#### `npm start`

Compiles all assets and starts a development server. Whenever you change a source file, the BrowserSync instance will reload your connected browsers with the changes. Sourcemaps are enabled.

#### `npm run start:staging`

Same as `npm:start`, but with production-ready assets. No sourcemaps, resources are optimized and gzipped.

#### `npm run build`

Builds all content and assets from `src` to `public`. Generates a production-ready build:

* The `production` baseUrl is applied by hugo
* Draft entries are not included
* Source maps are omitted
* JS & CSS is minified, `NODE_ENV=production` is passed to the javascript build
* A service worker is added to the build
* Debug console statement called with `utils/debug` are stripped

#### `npm run build:clean`

Removes the `public`-folder (executed automatically when running `npm run build` or `npm start`).

#### `npm run lint`

Runs eslint & stylelint against your code.

### Images/SVG

* Automatic svg sprites via [svg-sprite](https://github.com/jkphl/svg-sprite)
* Hugo partial to embed svg sprite


## Hugo Partials

### image/svg

Reference a SVG-symbol from `/static/svg/sprite.symbol.svg` by ID. The SVG build task will look for `.svg`-files in `src/img` and sub-directories. Usage:

``` html
  <div class="icon">{{ partial "media/svg" (dict "id" "the-icon" "class" "optional-class") }}</div>
```

Want to help developing?
here is our beautiful [design](https://www.figma.com/file/Y3YPzUDYd7gzN3nyrje3Zqij/OTS-draft)
