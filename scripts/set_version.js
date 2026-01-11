
import fs from 'fs';
import path from 'path';

// Get version from command line argument
const version = process.argv[2];

if (!version) {
    console.error('Usage: node set_version.js <version>');
    process.exit(1);
}

// Clean version string (remove 'v' prefix if present)
const cleanVersion = version.startsWith('v') ? version.substring(1) : version;

console.log(`Setting version to: ${cleanVersion}`);

// 1. Update package.json
const packageJsonPath = path.resolve('package.json');
try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = cleanVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
    console.log('Updated package.json');
} catch (error) {
    console.error('Error updating package.json:', error);
    process.exit(1);
}

// 2. Update src-tauri/tauri.conf.json
const tauriConfigPath = path.resolve('src-tauri', 'tauri.conf.json');
try {
    const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf8'));
    tauriConfig.version = cleanVersion;
    fs.writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));
    console.log('Updated src-tauri/tauri.conf.json');
} catch (error) {
    console.error('Error updating tauri.conf.json:', error);
    process.exit(1);
}

console.log('Version updated successfully.');
