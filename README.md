# import-sort-style-ralouphie

Style for [import-sort](https://github.com/renke/import-sort).

Install:

```
npm install -save-dev import-sort-style-ralouphie
```

Example of sorting:

```js
// Modules from the Node.js "standard" library sorted by name module name.
import { readFile, writeFile } from 'fs';
import * as path from 'path';
// Installed NPM packages, sorted by module name (special packages first).
import { ... } from 'a';
import b from 'b';
// Scoped modules (@-prefixed), sorted by module name.
import foo from '@a/foo';
import { bar, ... } from '@b/bar';
// All relative imports sorted by dot count, then module name.
import x from '../../baz/a';
import z from './baz/b';
import y from './baz/c';
```

You can setup special packages to appear first in the NPM packages section by setting `importSortConfig.specialList` in your `package.json`, for example:

```json
{
  "importSortConfig": {
    "specialList": [
      "react"
    ]
  }
}
```

The above will always place the `react` import just after Node.js modules.
