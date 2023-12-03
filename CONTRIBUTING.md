Thank you for your interest in contributing to ikona!

In open source, there are many ways to contribute. Here are some of the ways you can contribute:

## Development

### Commands

**`pnpm install`**: bootstraps the entire project, symlinks all dependencies for cross-component development and builds
all components.

**`pnpm dev`**: starts tsup with watch mode for all packages.

**`pnpm build`**: run build for all packages.

**`pnpm test`**: run test for all packages.

**`pnpm release`**: publish changed packages.

## Reporting Bugs

If you find a bug, please report it by opening an issue. Please include as much information as possible, including:

- A clear description of the bug
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots, if applicable

## Suggesting Enhancements

If you have an idea for an enhancement, please open an issue. Please include as much information as possible, including:

- A clear description of the enhancement
- Use cases for the enhancement
- Screenshots, if applicable

## Making a Pull Request?

If you are making a pull request, please make sure you have read the following guidelines:

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this
repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit
message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above categories

If you are interested in the detailed specification you can visit https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the ikona repository and clone your fork

2. Create a new branch out of the `main` branch. We follow the convention `[type/scope]`. For example
   `fix/accordion-hook` or `docs/menu-typo`. `type` can be either `docs`, `fix`, `feat`, `build`, or any other
   conventional commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/isBatak/ikona/blob/main/CONTRIBUTING.md#commit-convention). As you develop,
   you can run `pnpm pkg <module> build` and `pnpm pkg <module> test` to make sure everything works as expected. Please
   note that you might have to run `pnpm boot` first in order to build all dependencies.

4. Run `pnpm changeset` to create a detailed description of your changes. This will be used to generate a changelog when
   we publish an update. [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin main:master` (where origin will be your fork on GitHub)
   before `pnpm changeset` works.
5. Also, if you provide `jsx` snippets to the changeset, please turn off the live preview by doing the following at the
   beginning of the snippet: ` ```jsx live=false`

> If you made minor changes like CI config, prettier, etc, you can run `pnpm changeset add --empty` to generate an empty
> changeset file to document your changes.

### Tests

All commits that fix bugs or add features need a test.
