htmllint
========

[![npm version](http://img.shields.io/npm/v/htmllint.svg?style=flat-square)](https://npmjs.org/package/htmllint)
[![license](http://img.shields.io/npm/l/htmllint.svg?style=flat-square)](https://npmjs.org/package/htmllint)
[![build status](http://img.shields.io/travis/htmllint/htmllint/master.svg?style=flat-square)](https://travis-ci.org/htmllint/htmllint)
[![coveralls](http://img.shields.io/coveralls/htmllint/htmllint.svg?style=flat-square)](https://coveralls.io/r/htmllint/htmllint)
[![dependencies](http://img.shields.io/david/htmllint/htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint)
[![devDependencies](http://img.shields.io/david/dev/htmllint/htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint)

[![stories in ready](https://badge.waffle.io/htmllint/htmllint.svg?label=ready&title=Ready)](http://waffle.io/htmllint/htmllint)
[![code climate](http://img.shields.io/codeclimate/github/htmllint/htmllint.svg?style=flat-square)](https://codeclimate.com/github/htmllint/htmllint)

[![npm](https://nodei.co/npm/htmllint.png?downloads=true&downloadRank=true&stars=true)](https://npmsjs.org/package/htmllint)

Getting Started
---------------

To get started, pull in the dependencies:

```bash
$ npm install
# install gulp cli globally
$ npm install -g gulp
# lint js files
$ gulp lint
# run tests
$ gulp test

# the following is an easy way to do adhoc testing:
$ node # start node in the root dir of the repo
> var htmllint = require('./');
> htmllint('the html to lint');
```

Release History
---------------

### v0.0.7

* added rules:
  * attr-value-quotes
  * img-src-not-empty
  * label-for
  * tag-self-close
* fixed tag-name-lowercase bug

### v0.0.6

* fixed some runtime errors in a few rules
* fixed index errors that would occur on multiple runs
of the parser

### v0.0.5

* fixed line,col output bug
* added label-for rule

### v0.0.4

* added id-unique rule
* extended parser output
* refactored rules to fit new rule processing framework
* added presets (envs)

### v0.0.3

* added jsdoc
* added more rules
* added functional test suite

### v0.0.2

* added more rules
* added htmlparser2, rules run on an AST now

### v0.0.1

* added basic scraper for inline styles using regex
