# Specification Plan: Static Analysis SVG Sprite Extractor Plugin

## Objective

Build a Vite plugin, with a compatible Webpack integration, that statically analyzes application source code, discovers referenced icons, compiles only the corresponding local SVG assets into a sprite sheet, and injects that sprite into the document `<head>`.

The extraction model should resemble Panda CSS: source usage determines the generated build artifact, avoiding unused icons in the final output.

## Scope

### Included

- Scan `.js`, `.jsx`, `.ts`, and `.tsx` files.
- Extract statically declared icon names from supported JSX and function-call syntax.
- Resolve icon names to local `.svg` files.
- Convert SVG files into reusable `<symbol>` elements.
- Preserve each icon's native `viewBox`.
- Inject a hidden sprite into HTML during development and production builds.
- Keep the sprite synchronized during Vite HMR.
- Provide a small React runtime component that renders icons through `<use>`.
- Reuse the extraction and compilation core in a Webpack-compatible adapter.

### Excluded

- Dynamic icon names that cannot be resolved statically, such as `<Icon name={iconName} />`.
- Remote SVG fetching.
- Runtime discovery or loading of SVG files.
- Automatic transformation of arbitrary SVG imports.

## Supported Extraction Syntax

The analyzer must recognize these static forms for every JSX component configured in `icon.jsx`:

```jsx
<Icon name="search" />
<Icon name={'close'} />
<CurrencyIcon name="usd" />

ikona("menu")
ikona('profile')
```

`icon.jsx` defaults to `['Icon']`, while `icon.factory` defaults to `'ikona'`. Consumers can expand JSX component matching and rename the functional factory:

```js
svgSpritePlugin({
  icon: {
    jsx: ['Icon', 'CurrencyIcon', /^Product.*Icon$/],
    factory: 'useSvg',
  },
})
```

With this override, the functional syntax becomes `useSvg('menu')` instead of `ikona('menu')`. JSX string entries match an exact component name, while `RegExp` entries match component names by pattern. The plugin must validate these values and must not interpolate unescaped user input directly into a larger regular expression.

The initial implementation may use carefully bounded regular expressions. Prefer AST parsing if aliases, TypeScript syntax, comments, formatting variations, or false-positive prevention make regex handling unreliable.

## Proposed Architecture

Separate the implementation into a bundler-independent core and thin bundler adapters.

```text
Source files
    |
    v
Static extractor -----> Per-file icon registry
    |                           |
    |                           v
    +--------------------> Active icon Set
                                |
                                v
SVG resolver/normalizer --> Compiled <symbol> elements
                                |
                                v
                      Hidden SVG sprite markup
                                |
                    +-----------+-----------+
                    |                       |
                    v                       v
           Vite HTML injection      Webpack HTML injection
```

### Core modules

1. **Extractor** — receives source text and returns statically referenced icon names.
2. **Usage registry** — tracks icon usage per source file and derives the global active icon set.
3. **Asset resolver** — maps a validated icon name to its local SVG path.
4. **SVG compiler** — parses and normalizes SVG content into `<symbol>` markup.
5. **Sprite generator** — sorts symbols and produces deterministic hidden sprite markup.
6. **Vite adapter** — connects the core to Vite lifecycle hooks and HMR.
7. **Webpack adapter** — connects the same core to Webpack compilation and HTML hooks.

## Implementation Phases

### Phase 1: Define plugin configuration and public API

- Define plugin options, including:
  - `icon.jsx`: JSX component-name matchers, defaulting to `['Icon']`. Accept exact-name strings and `RegExp` values so users can extend extraction to components such as `CurrencyIcon`.
  - `icon.factory`: functional extractor name, defaulting to `'ikona'`. Accept a valid JavaScript identifier such as `'useSvg'`.
  - `iconDirectory`: absolute or project-relative SVG directory.
  - `include`: source file patterns, defaulting to JavaScript and TypeScript variants.
  - `exclude`: ignored paths such as dependencies and generated output.
  - `symbolPrefix`: default `icon-`.
  - Optional missing-icon behavior: `error`, `warn`, or `ignore`.
- Define the Vite plugin factory and Webpack adapter exports.
- Document that icon names must be statically analyzable string literals.

**Deliverable:** Stable plugin configuration and export surface.

### Phase 2: Implement static source extraction

- Filter input files to `.js`, `.jsx`, `.ts`, and `.tsx`.
- Extract icon names from:
  - `<Icon name="..." />`, where `Icon` matches an entry in `icon.jsx`.
  - `<Icon name={'...'} />`, where `Icon` matches an entry in `icon.jsx`.
  - `ikona("...")`, using the function name configured by `icon.factory`.
  - `ikona('...')`, using the function name configured by `icon.factory`.
- Default JSX extraction to the `Icon` component only.
- Match additional JSX component names configured through `icon.jsx`, including exact-name strings and regular expressions.
- Default functional extraction to `ikona()` and match a custom exact function name when `icon.factory` is configured.
- Deduplicate matches within each file.
- Reject or ignore dynamic expressions.
- Avoid matches in unsupported files.
- Add focused fixtures for whitespace, multiline JSX, quote styles, duplicate uses, comments, and malformed calls.

**Deliverable:** A pure `extractIconNames(code)` function with unit tests.

### Phase 3: Build an HMR-safe usage registry

- Store icon usage by module ID rather than only appending to a global set:

  ```js
  const iconsByModule = new Map()
  const activeIcons = new Set()
  ```

- On every transform:
  1. Extract the current file's icon names.
  2. Replace that file's previous registry entry.
  3. Recompute or incrementally update `activeIcons`.
- Remove registry entries for deleted or invalidated modules.
- Invalidate generated sprite output whenever the active icon set changes.

Tracking usage per file is required so HMR can remove icons that are no longer referenced, rather than leaving stale names in an append-only set.

**Deliverable:** Deterministic active-icon state that supports additions, removals, and file deletion.

### Phase 4: Resolve and compile SVG assets

- Validate extracted names before constructing paths to prevent path traversal.
- Map each name to `[iconDirectory]/[name].svg`.
- Read only files represented by the active icon set.
- Parse each root `<svg>` element and preserve its `viewBox`.
- Remove the outer `<svg>` wrapper and processing clutter, including:
  - XML declarations.
  - Namespace declarations.
  - Metadata elements.
  - Unneeded width and height attributes.
- Retain meaningful child markup and accessibility-independent graphical attributes.
- Emit one symbol per icon:

  ```html
  <symbol id="icon-search" viewBox="0 0 24 24">
    <!-- normalized SVG children -->
  </symbol>
  ```

- Produce useful diagnostics for missing files, invalid SVG, duplicate IDs, and missing `viewBox` values.
- Sort symbols by icon name so output is stable across runs.

**Deliverable:** A tested SVG-to-symbol compilation pipeline.

### Phase 5: Integrate with the Vite lifecycle

#### `transform` hook

- Apply source filtering.
- Update the per-module usage registry.
- Return the original code unchanged unless source maps or future transformations require a result.
- Trigger sprite regeneration when discovered usage changes.

#### `transformIndexHtml` hook

- Compile the current active icon set.
- Return a Vite HTML tag descriptor targeting `head`/`head-prepend`, or inject markup immediately before `</head>` when string transformation is required.
- Generate this wrapper:

  ```html
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style="display: none"
  >
    <!-- compiled symbols -->
  </svg>
  ```

#### Development and HMR

- Ensure changes to application source update the registry.
- Watch the icon asset directory so modifications to an active SVG invalidate the served HTML or refresh the page.
- Ensure removing the last reference to an icon removes its symbol.
- Confirm that adding a previously unused icon file or fixing a missing file can recover without restarting the server.

**Deliverable:** Working Vite development and production behavior.

### Phase 6: Add Webpack compatibility

- Reuse the extractor, registry, resolver, compiler, and sprite generator.
- Collect source usage through the appropriate module/build hooks.
- Integrate with `html-webpack-plugin` hooks for `<head>` injection.
- Rebuild the sprite during watch mode when source usage or active SVG assets change.
- Keep configuration and diagnostics aligned with the Vite plugin.

**Deliverable:** A thin Webpack adapter with equivalent generated markup.

### Phase 7: Provide the runtime React component

```jsx
// components/Icon.jsx
export function Icon({ name, size = 24, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      className={`icon icon-${name} ${className}`}
      aria-hidden="true"
      {...props}
    >
      <use href={`#icon-${name}`} />
    </svg>
  )
}
```

- Document that `name` should be a static string at call sites so the extractor can discover it.
- Consider trimming the resulting class string when `className` is empty.
- Document how consumers can override accessibility attributes when an icon conveys meaning.

**Deliverable:** Runtime component and usage documentation.

## Verification Plan

### Unit tests

- Extract every supported JSX and function form.
- Extract usage from the default `Icon` component.
- Extract usage from additional exact and regular-expression component matchers in `icon.jsx`.
- Do not match components outside the configured `icon.jsx` patterns.
- Extract usage from the default `ikona()` factory.
- Extract usage from a custom factory such as `useSvg()` when configured through `icon.factory`.
- Do not match the default `ikona()` name when a custom factory replaces it.
- Ignore dynamic values and unrelated component/function names.
- Deduplicate repeated icon references.
- Validate icon keys and reject path traversal attempts.
- Preserve SVG `viewBox` attributes.
- Remove outer SVG wrappers and unwanted metadata.
- Generate stable, sorted sprite output.
- Report missing and malformed assets according to configuration.

### Integration tests

- Vite production build includes only referenced icons.
- Vite HTML contains the sprite inside `<head>`.
- Development mode adds newly referenced icons.
- Development mode removes icons after their final reference is deleted.
- Editing an active SVG refreshes the generated sprite.
- Webpack produces equivalent sprite markup.
- Multiple source files referencing the same icon produce one symbol.

### Runtime checks

- `<Icon name="search" />` renders the matching symbol.
- Width, height, class names, and additional SVG props pass through correctly.
- Symbols retain expected proportions through their source `viewBox`.
- The sprite wrapper remains visually hidden and does not affect layout.

## Acceptance Criteria

- Only statically referenced icons are present in the generated sprite.
- All four supported source extensions are analyzed.
- All specified JSX and functional syntaxes are recognized.
- `icon.jsx` defaults to `['Icon']` and supports additional exact-name and `RegExp` component matchers.
- `icon.factory` defaults to `'ikona'` and supports a custom function name such as `'useSvg'`.
- Removed references do not leave stale symbols during HMR.
- SVG symbols use deterministic IDs in the form `icon-[name]` by default.
- Native `viewBox` values are preserved.
- The sprite is injected into the HTML `<head>` in development and production.
- Vite and Webpack integrations share the same extraction and compilation logic.
- Missing or invalid SVG assets produce clear, configurable diagnostics.
- Automated tests cover extraction, compilation, injection, and watch-mode updates.

## Key Risks and Mitigations

- **Regex false positives or missed syntax:** Keep extraction isolated behind a common interface so it can be upgraded to AST parsing without changing the bundler adapters.
- **Stale HMR state:** Track usage per module and derive the active set instead of relying on an append-only global set.
- **Unsafe file resolution:** Restrict names to an allowlisted pattern and verify resolved paths remain inside the configured icon directory.
- **Malformed or unsafe SVG content:** Use an XML/SVG-aware parser and explicit sanitization rules instead of broad string replacement.
- **Hook ordering differences:** Add end-to-end fixtures for both Vite and Webpack HTML generation.
- **Non-deterministic builds:** Sort icon names and normalize emitted markup.

## Completion Checklist

- [ ] Public plugin API and configuration defined.
- [ ] Static extractor implemented and tested.
- [ ] Per-module icon registry implemented.
- [ ] SVG resolver and compiler implemented.
- [ ] Deterministic sprite generator implemented.
- [ ] Vite `transform` integration completed.
- [ ] Vite `transformIndexHtml` injection completed.
- [ ] Vite HMR and SVG asset watching verified.
- [ ] Webpack adapter completed.
- [ ] React `Icon` component added.
- [ ] Unit and integration test suites passing.
- [ ] Usage, limitations, and diagnostics documented.
