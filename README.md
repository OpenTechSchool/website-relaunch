# OpenTechSchool - [Website](http://www.opentechschool.org)

[![Join the chat at https://gitter.im/OpenTechSchool/www.opentechschool.org](https://badges.gitter.im/OpenTechSchool/www.opentechschool.org.svg)](https://gitter.im/OpenTechSchool/www.opentechschool.org?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

```
The source code behind the new OTS main web site.
```


## Setup

This site is built using [Hugo](https://gohugo.io/), a static site generator.
You can clone the project and start the server running:

```sh
git clone git@github.com:OpenTechSchool/website-relaunch.git
npm install
hugo
hugo server --watch
```

To build the javascript and css we use `package.json`.
You can build the website running:

```
npm run build
```
open `http://localhost:1313`

If you are developing you can watch your file running:

```
npm run watch
```

Want to help developing?
here is our beautiful [design](https://www.figma.com/file/Y3YPzUDYd7gzN3nyrje3Zqij/OTS-draft)




