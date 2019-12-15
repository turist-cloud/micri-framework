promise-cache
=============

Cache and dedup async function calls using the arguments as an n-tuple
cache key. The wrapper is caching layer agnostic and the whatever cache
is used is only required to provide `.get()`, `.set()`, and `.del()`
functions.

**Example**

```js
const LRU = require('lru-cache');
const ms = require('ms');

const cache = new LRU({
	max: 100,
	maxAge: ms('5s')
});

const getData = promiseCache(cache, async (args1, args2) => {
	// ... do async stuff

	return something;
});
```
