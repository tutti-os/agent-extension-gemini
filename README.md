# Gemini CLI Agent Extension for Tutti

This repository packages the declarative metadata that connects the official
[Gemini CLI](https://github.com/google-gemini/gemini-cli) ACP runtime to Tutti.
It does not fork or redistribute Gemini CLI.

Tutti currently discovers an existing compatible `gemini` executable. The
manifest declares a future project-scoped installation of the exact
`@google/gemini-cli@0.50.0` npm package, but Tutti will not execute that command
until its explicit user-confirmation flow is available. Gemini runs as an ACP
subprocess through `gemini --acp`; no extension code is loaded into Tutti or
Electron.

## Build

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm package:tutti-agent
```

The package is written to `build/tutti-agent/package`. This repository owns its
release implementation under `scripts/release/`: it validates that directory,
creates a reproducible ZIP, signs release metadata, uploads immutable objects,
and conditionally updates the Agent's version index. Publishing an Agent does
not require publishing Tutti or checking out release code from the Tutti
repository.

## Release

The manual `Publish Agent Extension` workflow uses GitHub OIDC and expects the
repository variables `TUTTI_APP_RELEASES_AWS_REGION`,
`TUTTI_APP_RELEASES_AWS_ROLE_ARN`, `TUTTI_APP_RELEASES_S3_BUCKET`, and
`TUTTI_AGENT_RELEASES_CLOUDFRONT_DISTRIBUTION_ID`. Store the Ed25519 signing
private key only in `TUTTI_AGENT_EXTENSION_SIGNING_PRIVATE_KEY`.

Dispatch the workflow with a new immutable semantic version. It builds and
tests this repository, uploads versioned artifacts without overwriting existing
bytes, updates `versions.json` and `latest.json`, and invalidates only the
mutable CDN paths.

The manifest also owns Gemini's Agent home presentation assets: the primary
`assets/icon.svg` and the square `assets/hero-image.jpg` used by Tutti's vinyl
carousel. Tutti caches both from the verified extension artifact instead of
maintaining a Gemini-specific renderer asset.

## License and trademarks

The extension metadata is Apache-2.0 licensed. Gemini and the Gemini logo are
trademarks of Google LLC. This project is maintained by Tutti OS and is not a
fork of Gemini CLI.
