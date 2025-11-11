# 📁 Project Structure

```
react-native-package-checker/
│
├── 📄 package.json                    # Package configuration & metadata
├── 📄 package-lock.json               # Dependency lock file
├── 📄 tsconfig.json                   # TypeScript configuration
│
├── 📄 index.ts                        # TypeScript entry point (source)
├── 📄 index.js                        # JavaScript entry point (main)
├── 📄 index.d.ts                      # TypeScript type definitions
│
├── 📄 app.plugin.js                   # Expo plugin entry point
│
├── 📂 plugin/                         # Expo config plugin
│   ├── 📄 withPackageChecker.ts      # Plugin source (TypeScript)
│   └── 📄 withPackageChecker.js      # Plugin compiled (JavaScript)
│
├── 📂 android/                        # Native Android module
│   ├── 📄 build.gradle               # Gradle build configuration
│   └── 📂 src/main/
│       ├── 📄 AndroidManifest.xml    # Android permissions
│       └── 📂 java/com/packagechecker/
│           ├── 📄 PackageCheckerModule.java    # Main native module
│           └── 📄 PackageCheckerPackage.java   # React Native package
│
├── 📂 lib/                            # Compiled TypeScript output
│   ├── 📄 index.js
│   ├── 📄 index.d.ts
│   └── 📂 plugin/
│       ├── 📄 withPackageChecker.js
│       └── 📄 withPackageChecker.d.ts
│
├── 📂 node_modules/                   # Dependencies (not published)
│
├── 📄 README.md                       # Main documentation
├── 📄 CHANGELOG.md                    # Version history
├── 📄 PROJECT_SUMMARY.md              # Project overview
├── 📄 PUBLISHING_CHECKLIST.md         # Pre-publish checklist
│
├── 📄 .gitignore                      # Git ignore rules
├── 📄 .npmignore                      # NPM ignore rules
│
├── 📄 example-app.config.js           # Example Expo config
├── 📄 example-usage.tsx               # Example React component
└── 📄 test-package.sh                 # Quick test script
```

## 📦 Files Included in NPM Package

When you run `npm publish`, these files will be included:

```
✅ index.js                            # Main entry point
✅ index.d.ts                          # TypeScript types
✅ app.plugin.js                       # Expo plugin entry
✅ plugin/withPackageChecker.js        # Expo plugin implementation
✅ android/                            # Complete native Android code
   ✅ build.gradle
   ✅ src/main/AndroidManifest.xml
   ✅ src/main/java/com/packagechecker/*.java
✅ README.md                           # Documentation
✅ package.json                        # Package metadata
```

## 🚫 Files Excluded from NPM Package

These files won't be published (via `.npmignore`):

```
❌ *.ts (except .d.ts)                 # TypeScript source files
❌ tsconfig.json                       # TypeScript config
❌ .gitignore                          # Git config
❌ android/build/                      # Build artifacts
❌ android/.gradle/                    # Gradle cache
❌ example-*.{js,tsx}                  # Example files
❌ test-package.sh                     # Test script
❌ PROJECT_SUMMARY.md                  # Internal docs
❌ PUBLISHING_CHECKLIST.md             # Internal docs
```

## 🎯 Key Files Explained

### Core Module Files

-   **`index.ts`** - TypeScript source that wraps the native module
-   **`index.js`** - Compiled JavaScript (generated from index.ts)
-   **`index.d.ts`** - TypeScript type definitions for the API

### Expo Plugin Files

-   **`app.plugin.js`** - Entry point that Expo reads from package.json
-   **`plugin/withPackageChecker.ts`** - Config plugin source code
-   **`plugin/withPackageChecker.js`** - Compiled config plugin

### Native Android Files

-   **`PackageCheckerModule.java`** - Implements the native methods
-   **`PackageCheckerPackage.java`** - Registers module with React Native
-   **`AndroidManifest.xml`** - Declares required permissions
-   **`build.gradle`** - Configures Android library build

### Configuration Files

-   **`package.json`** - NPM package configuration with Expo plugin reference
-   **`tsconfig.json`** - TypeScript compiler settings

### Documentation Files

-   **`README.md`** - User-facing documentation for NPM
-   **`CHANGELOG.md`** - Version history and release notes
-   **`PROJECT_SUMMARY.md`** - Development overview (this file)
-   **`PUBLISHING_CHECKLIST.md`** - Pre-publish checklist

## 🔄 Build Process

```bash
npm run build
```

This compiles:

-   `index.ts` → `index.js` + `lib/index.js`
-   `plugin/withPackageChecker.ts` → `plugin/withPackageChecker.js` + `lib/plugin/withPackageChecker.js`

## 📱 How It Works

```
User's Expo App
      ↓
   app.json (plugins: ["react-native-package-checker"])
      ↓
   npx expo prebuild
      ↓
   app.plugin.js → plugin/withPackageChecker.js
      ↓
   Modifies AndroidManifest.xml
      ↓
   Android Build
      ↓
   React Native App uses index.js → NativeModules.PackageChecker
      ↓
   Calls PackageCheckerModule.java native methods
      ↓
   Returns results to JavaScript
```

## 🎨 Architecture

```
┌─────────────────────────────────────────┐
│         JavaScript Layer (TS/JS)        │
│  - index.ts/js: API wrapper             │
│  - Type definitions                     │
└────────────────┬────────────────────────┘
                 │ NativeModules bridge
                 ↓
┌─────────────────────────────────────────┐
│         Native Android Layer            │
│  - PackageCheckerModule.java            │
│  - Android PackageManager API           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         Expo Config Plugin              │
│  - withPackageChecker.ts/js             │
│  - Modifies AndroidManifest during      │
│    prebuild                             │
└─────────────────────────────────────────┘
```
