# subset-shot

> Snapshot testing where new value can be a superset of the saved snapshot

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Related

This is a sister project to [snap-shot](https://github.com/bahmutov/snap-shot) and
[schema-shot](https://github.com/bahmutov/schema-shot)

## Why

Imagine you have an API returning list of Oscar-winning movies. At some point it returns
N movie titles, including "Braveheart", "Titanic" and "The Artist" 
(see example page [here](http://www.today.com/popculture/complete-list-every-best-picture-oscar-winner-ever-t107617)).
You write an end to end test and would like to use 
[snapshot testing](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html), but you cannot
because at some point in February of the next year a new movie will be added and your 
snapshot will have to be updated.

This module solves this problem by allowing *future values* to be a superset of the saved snapshot.
If API returns more movies - it is fine, as long as it returns all the ones already saved in the
snapshot.

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save-dev subset-shot
```

## Use

This module works using same [stack-walking, AST parsing magic](https://glebbahmutov.com/blog/snapshot-testing/)
as [snap-shot](https://github.com/bahmutov/snap-shot) and 
[schema-shot](https://github.com/bahmutov/schema-shot). This means, just use it in any testing
framework (like Ava, Jest, etc)

```js
// movies-spec.js
const subsetShot = require('subset-shot')
it('Oscar movies', () => {
  const list = ['Braveheart', 'Titanic']
  subsetShot(list)
})
```

The snapshot file will have contents

```js
// movies-spec.js.subset-shot
exports['Oscar movies'] = [
  'Braveheart', 
  'Titanic'
]
```

Later the API might return more movies, yet the same test still passes because the snapshot
has subset of the new data.

```js
// movies-spec.js
const subsetShot = require('subset-shot')
it('Oscar movies', () => {
  const list = ['Braveheart', 'Titanic', 'The Artist']
  subsetShot(list)
})
```

The test still passes. But a test that all of the sudden returns empty list or nothing, or
a totally different set of movies (by confusing "Best Picture" with "Best Director" for example)
fails.

## Updating snapshots

You can show the snapshots but skip saving them (dry run) by running tests with 
environment variable `DRY=1 npm test`.

You can show and save snapshots by running tests with environment variable `SHOW=1 npm test`.

You can update saved snapshots by running tests with environment variable `UPDATE=1 npm test`.

## Comparing objects

A snapshot could be an object subset, compared using 
[obj-subset](https://github.com/kvnneff/obj-subset).

```js
// saved snapshot is {foo: 42}
const subsetShot = require('subset-shot')
it('allows new properties', () => {
  subsetShot({foo: 42, bar: 10}) // ok
})
it('requires value', () => {
  subsetShot({foo: 20}) // exception, value should 42
})
it('requires matching key', () => {
  subsetShot({foo2: 42}) // exception, wrong key name
})
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/subset-shot/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/subset-shot.svg?downloads=true
[npm-url]: https://npmjs.org/package/subset-shot
[ci-image]: https://travis-ci.org/bahmutov/subset-shot.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/subset-shot
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
