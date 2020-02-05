import { join } from 'path';
import { readFileSync } from 'fs';
import { IStyleAPI, IStyleItem } from "import-sort-style";
import { IImport } from 'import-sort-parser';

let memoizedConfig;
function getConfig() {
  if (typeof memoizedConfig === 'undefined') {
    try {
      const packageJsonPath = join(process.cwd(), 'package.json');
      const json = readFileSync(packageJsonPath, { encoding: 'utf8' });
      const data = JSON.parse(json);
      const config = data && data.importSortConfig;
      memoizedConfig = config || null;
    } catch (e) {
      memoizedConfig = null;
    }
  }
  return memoizedConfig;
}

export default function(styleApi: IStyleAPI): IStyleItem[] {

  const config = getConfig();
  const specialList: string[] = (config && config.specialList) || [];

  function isSpecial(imported: IImport) {
    return specialList.indexOf(imported.moduleName) >= 0;
  }

  const {
    alias,
    always,
    and,
    dotSegmentCount,
    isAbsoluteModule,
    isScopedModule,
    isNodeModule,
    moduleName,
    naturally,
    unicode,
    isInstalledModule,
  } = styleApi;

  return [
    // Node packages, sorted by module name.
    {
        match: isNodeModule,
        sort: moduleName(naturally),
        sortNamedMembers: alias(unicode),
    },
    // Installed NPM packages, sorted by module name.
    {
        match: and(isInstalledModule(__filename), isSpecial),
        sort: moduleName(naturally),
        sortNamedMembers: alias(unicode),
    },
    // Installed NPM packages, sorted by module name.
    {
        match: isInstalledModule(__filename),
        sort: moduleName(naturally),
        sortNamedMembers: alias(unicode),
    },
    // Scoped modules (@-prefixed), sorted by module name.
    {
        match: isScopedModule,
        sort: moduleName(naturally),
        sortNamedMembers: alias(unicode),
    },
    // All relative imports sorted by dot count, then module name.
    {
        match: isAbsoluteModule,
        sort: [dotSegmentCount, moduleName(naturally)],
        sortNamedMembers: alias(unicode),
    },
    // All other imports sorted by dot count, then module name.
    {
        match: always,
        sort: [dotSegmentCount, moduleName(naturally)],
        sortNamedMembers: alias(unicode),
    },
  ];
}
