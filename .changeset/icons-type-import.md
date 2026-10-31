---
'@ikona/cli': patch
---

- The generated `icons.ts` imports `IconName` with `import type`, so it compiles with `verbatimModuleSyntax` and bundlers no longer try to load the `.d.ts` types file at runtime.
- Old hashed sprites are now fully removed before the new sprite is written, so the freshly generated sprite can no longer be deleted by a late cleanup.
