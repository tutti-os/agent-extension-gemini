# Contributor Instructions

This repository publishes a declarative Tutti Agent Extension for Gemini CLI.

- Do not add Gemini CLI binaries, install scripts, JavaScript normalizers, WASM,
  or renderer code to `extension/`.
- Keep release implementation under `scripts/release/` and make the repository
  workflow self-contained; do not depend on release code from the Tutti repository.
- Keep the npm package version exact and keep discovery compatibility aligned
  with the tool and capability profiles.
- User-visible copy belongs in every locale under `extension/locales/`.
- Run `pnpm check` before committing.
- Use Conventional Commits and DCO sign-off.
