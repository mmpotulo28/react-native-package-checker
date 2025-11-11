# 📋 Pre-Publishing Checklist

Before publishing `react-native-package-checker` to NPM, go through this checklist:

## ✅ Required Steps

### 1. Package Metadata

-   [ ] Update `author` field in `package.json`
-   [ ] Update `repository` field in `package.json` (if using Git)
-   [ ] Add `homepage` field (e.g., GitHub repo URL)
-   [ ] Add `bugs` field (e.g., GitHub issues URL)
-   [ ] Verify version number is correct

Example:

```json
{
	"author": "Your Name <your.email@example.com>",
	"repository": {
		"type": "git",
		"url": "https://github.com/yourusername/react-native-package-checker.git"
	},
	"homepage": "https://github.com/yourusername/react-native-package-checker#readme",
	"bugs": {
		"url": "https://github.com/yourusername/react-native-package-checker/issues"
	}
}
```

### 2. Build & Verify

-   [x] TypeScript compiled successfully (`npm run build`)
-   [ ] Test the package locally using `npm pack`
-   [ ] Verify all files are included in the package
-   [ ] Check that unnecessary files are excluded via `.npmignore`

### 3. Testing

-   [ ] Test in an Expo managed workflow project
-   [ ] Test with `npx expo prebuild`
-   [ ] Test on a physical Android device or emulator
-   [ ] Verify both native methods work:
    -   [ ] `isPackageAvailable()` returns correct results
    -   [ ] `checkPackagesByPattern()` returns matching packages
-   [ ] Test the Expo config plugin adds permissions correctly

### 4. Documentation

-   [ ] Review and update `README.md` if needed
-   [ ] Update `CHANGELOG.md` with release notes
-   [ ] Verify code examples work correctly
-   [ ] Check that TypeScript types are correct

### 5. Git Repository

-   [ ] Initialize Git repository: `git init`
-   [ ] Create `.gitignore` (already created)
-   [ ] Make initial commit
-   [ ] Create GitHub repository
-   [ ] Push to GitHub
-   [ ] Add GitHub repository URL to `package.json`

## 🚀 Publishing Steps

### First Time Setup

```bash
# Login to NPM (if not already logged in)
npm login

# Verify you're logged in
npm whoami
```

### Build and Publish

```bash
# 1. Ensure TypeScript is compiled
npm run build

# 2. Test the package locally
npm pack
# This creates a .tgz file you can test with: npm install ./react-native-package-checker-1.0.0.tgz

# 3. Publish to NPM
npm publish

# For scoped packages (e.g., @yourorg/react-native-package-checker)
npm publish --access public
```

### Post-Publishing

-   [ ] Verify package appears on npmjs.com
-   [ ] Test installation in a new project: `npm install react-native-package-checker`
-   [ ] Create a GitHub release with tag matching version
-   [ ] Share on social media / React Native community

## 🧪 Quick Local Testing

Use the included test script:

```bash
# Make it executable (already done)
chmod +x test-package.sh

# Run the test
./test-package.sh
```

Or manually test:

```bash
# 1. Create a test Expo app
npx create-expo-app test-app --template blank
cd test-app

# 2. Install your local package
npm install ../react-native-package-checker

# 3. Add plugin to app.json
# Add "react-native-package-checker" to the plugins array

# 4. Prebuild
npx expo prebuild --platform android

# 5. Run on Android
npx expo run:android
```

## 📦 What Gets Published

Files included in the NPM package:

-   ✅ `index.js` (main entry)
-   ✅ `index.d.ts` (TypeScript types)
-   ✅ `app.plugin.js` (Expo plugin entry)
-   ✅ `plugin/withPackageChecker.js` (compiled plugin)
-   ✅ `android/` directory (native code)
-   ✅ `README.md`
-   ✅ `package.json`

Files excluded (via `.npmignore`):

-   ❌ TypeScript source files (`*.ts`)
-   ❌ `tsconfig.json`
-   ❌ `.gitignore`
-   ❌ IDE configs
-   ❌ Build artifacts
-   ❌ Example files

## 🔍 Pre-Publish Verification Commands

```bash
# Check what will be published
npm pack --dry-run

# View package contents
tar -tzf react-native-package-checker-1.0.0.tgz

# Install locally for testing
npm pack
npm install -g ./react-native-package-checker-1.0.0.tgz
```

## 📝 Version Management

When making updates:

```bash
# Patch version (1.0.0 -> 1.0.1) - Bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) - New features, backwards compatible
npm version minor

# Major version (1.0.0 -> 2.0.0) - Breaking changes
npm version major

# Then publish
npm publish
```

## 🎯 Current Status

-   ✅ All source files created
-   ✅ TypeScript compiled
-   ✅ Native Android module implemented
-   ✅ Expo config plugin created
-   ✅ Documentation complete
-   ⚠️ Needs testing in real app
-   ⚠️ Needs package metadata updates
-   ⚠️ Ready for local testing

## 🔗 Useful Links

-   [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
-   [Expo Config Plugins](https://docs.expo.dev/guides/config-plugins/)
-   [React Native Native Modules](https://reactnative.dev/docs/native-modules-android)
-   [Creating React Native Libraries](https://reactnative.dev/docs/native-modules-setup)

---

**Next Steps:**

1. Update package metadata
2. Test locally using `./test-package.sh`
3. Initialize Git and push to GitHub
4. Publish to NPM

Good luck! 🚀
