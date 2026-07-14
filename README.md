# Gemini CLI Agent Extension for Tutti

This repository packages the declarative metadata that connects the official
[Gemini CLI](https://github.com/google-gemini/gemini-cli) ACP runtime to Tutti.
It does not fork or redistribute Gemini CLI.

Tutti first discovers an existing compatible `gemini` executable. If no local
runtime is available, the extension can offer a project-scoped installation of
the exact `@google/gemini-cli@0.50.0` npm package. Gemini runs as an ACP subprocess
through `gemini --acp`; no extension code is loaded into Tutti or Electron.

## Build

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm package:tutti-agent
```

The package is written to `build/tutti-agent/package`. The Tutti Agent Extension
release workflow validates that directory, creates a reproducible ZIP, signs
release metadata, and updates the version index.

## License and trademarks

The extension metadata is Apache-2.0 licensed. Gemini and the Gemini logo are
trademarks of Google LLC. This project is maintained by Tutti OS and is not a
fork of Gemini CLI.
