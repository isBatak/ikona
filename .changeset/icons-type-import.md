---
'@ikona/cli': patch
---

The generated `icons.ts` imports `IconName` with `import type`, so it compiles with `verbatimModuleSyntax` and bundlers no longer try to load the `.d.ts` types file at runtime.
