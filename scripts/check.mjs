import { execFileSync } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
execFileSync(process.execPath, [path.join(root, "scripts", "package.mjs")], {
  stdio: "inherit"
});
const packageDir = path.join(root, "build", "tutti-agent", "package");
const manifest = JSON.parse(
  await readFile(path.join(packageDir, "tutti.agent.json"), "utf8")
);
if (manifest.schemaVersion !== "tutti.agent.manifest.v2" || manifest.agentKey !== "gemini") {
  throw new Error("invalid Gemini extension manifest identity");
}
if (manifest.runtime?.launch?.args?.join("\0") !== "--acp") {
  throw new Error("Gemini extension must launch the official --acp mode");
}
if (
  manifest.heroImage?.type !== "asset" ||
  manifest.heroImage?.src !== "assets/hero-image.jpg"
) {
  throw new Error("Gemini extension must declare its home hero image asset");
}
for (const file of Object.values(manifest.profiles)) {
  const profile = JSON.parse(await readFile(path.join(packageDir, file), "utf8"));
  if (!String(profile.schemaVersion || "").startsWith("tutti.agent.")) {
    throw new Error(`profile ${file} has an invalid schemaVersion`);
  }
}
await rejectExecutableEntries(packageDir);
process.stdout.write("Gemini Agent Extension checks passed\n");

async function rejectExecutableEntries(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`symlink is forbidden: ${entryPath}`);
    if (entry.isDirectory()) {
      await rejectExecutableEntries(entryPath);
      continue;
    }
    const info = await stat(entryPath);
    if ((info.mode & 0o111) !== 0) throw new Error(`executable is forbidden: ${entryPath}`);
  }
}
