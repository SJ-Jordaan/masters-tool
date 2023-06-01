/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const semver = require("semver");

// Read command line arguments
const [, , versionType] = process.argv;

if (!["patch", "minor", "major"].includes(versionType)) {
  console.error(`Invalid version type: ${versionType}`);
  console.error("Usage: npm run prep [patch|minor|major]");
  process.exit(1);
}

// Read package.json
const packageJsonPath = path.resolve(__dirname, "..", "package.json");
const packageJson = require(packageJsonPath);

// Update package.json version
const newVersion = semver.inc(packageJson.version, versionType);
packageJson.version = newVersion;

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

// Read src/common/constants/build.js
const buildJsPath = path.resolve(
  __dirname,
  "..",
  "src",
  "common",
  "constants",
  "build.js"
);
const buildJsContent = fs.readFileSync(buildJsPath, "utf-8");

// Update build.js version
const updatedBuildJsContent = buildJsContent.replace(
  /version: '.*'/,
  `version: '${newVersion}'`
);

// Write updated build.js
fs.writeFileSync(buildJsPath, updatedBuildJsContent);

console.log(`Version updated to: ${newVersion}`);
