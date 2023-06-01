/* eslint-disable no-console */
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { inc } from 'semver';

// Read command line arguments
const [ , , versionType ] = process.argv;

if (![ 'patch', 'minor', 'major' ].includes(versionType)) {
  console.error(`Invalid version type: ${versionType}`);
  console.error('Usage: npm run prep [patch|minor|major]');
  process.exit(1);
}

// Read package.json
const packageJsonPath = resolve(__dirname, '..', 'package.json');
const packageJson = require(packageJsonPath);

// Update package.json version
const newVersion = inc(packageJson.version, versionType);
packageJson.version = newVersion;

// Write updated package.json
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Read src/common/constants/build.js
const buildJsPath = resolve(__dirname, '..', 'src', 'common', 'constants', 'build.js');
const buildJsContent = readFileSync(buildJsPath, 'utf-8');

// Update build.js version
const updatedBuildJsContent = buildJsContent.replace(/version: '.*'/, `version: '${newVersion}'`);

// Write updated build.js
writeFileSync(buildJsPath, updatedBuildJsContent);

console.log(`Version updated to: ${newVersion}`);