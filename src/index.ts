import {IStyleAPI, IStyleItem} from "import-sort-style";

export default function(styleApi: IStyleAPI): IStyleItem[] {

  const {
    alias,
    always,
    dotSegmentCount,
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
      match: always,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    }
  ];
}
