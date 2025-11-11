# react-native-package-checker

A React Native native module for detecting installed Android packages with full Expo support via config plugin.

## Features

-   ✅ Check if a specific Android package is installed
-   ✅ Find packages matching a regex pattern
-   ✅ Full TypeScript support
-   ✅ Expo SDK 52 compatible
-   ✅ Works with Expo prebuild and EAS Build
-   ✅ React Native 0.73+ compatible

## Installation

```bash
npm install react-native-package-checker
# or
yarn add react-native-package-checker
```

### Expo Projects

Add the plugin to your `app.json` or `app.config.js`:

```json
{
	"expo": {
		"plugins": ["react-native-package-checker"]
	}
}
```

Then run prebuild:

```bash
npx expo prebuild
```

### Bare React Native Projects

For bare React Native projects, you'll need to manually link the native module:

#### Android

1. Add the package to your `android/settings.gradle`:

```gradle
include ':react-native-package-checker'
project(':react-native-package-checker').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-package-checker/android')
```

2. Add the dependency in `android/app/build.gradle`:

```gradle
dependencies {
    implementation project(':react-native-package-checker')
}
```

3. Register the module in `MainApplication.java`:

```java
import com.packagechecker.PackageCheckerPackage;

@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new PackageCheckerPackage() // Add this line
  );
}
```

4. Add the permission to your `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />

    <queries>
        <intent>
            <action android:name="android.intent.action.MAIN" />
        </intent>
    </queries>
</manifest>
```

## Usage

```typescript
import PackageChecker from "react-native-package-checker";

// Check if a specific package is installed
async function checkChrome() {
	const isInstalled = await PackageChecker.isPackageAvailable("com.android.chrome");
	console.log("Chrome installed:", isInstalled);
}

// Find all Google packages
async function findGooglePackages() {
	const packages = await PackageChecker.checkPackagesByPattern("com\\.google\\..*");
	console.log("Google packages:", packages);
}

// Find all packages containing "facebook"
async function findFacebookPackages() {
	const packages = await PackageChecker.checkPackagesByPattern(".*facebook.*");
	console.log("Facebook packages:", packages);
}
```

## API

### `isPackageAvailable(packageName: string): Promise<boolean>`

Check if a specific Android package is installed on the device.

**Parameters:**

-   `packageName` (string): The Android package name (e.g., "com.android.chrome")

**Returns:** Promise that resolves to `true` if package is installed, `false` otherwise

**Example:**

```typescript
const isInstalled = await PackageChecker.isPackageAvailable("com.whatsapp");
```

### `checkPackagesByPattern(pattern: string): Promise<string[]>`

Find all installed packages matching a regex pattern.

**Parameters:**

-   `pattern` (string): A regex pattern to match package names (e.g., "com.google.\*")

**Returns:** Promise that resolves to an array of matching package names

**Example:**

```typescript
// Find all packages starting with "com.google"
const googleApps = await PackageChecker.checkPackagesByPattern("^com\\.google\\..*");

// Find all packages containing "camera"
const cameraApps = await PackageChecker.checkPackagesByPattern(".*camera.*");
```

## Platform Support

-   ✅ Android
-   ❌ iOS (not applicable - iOS doesn't allow package detection for privacy reasons)

## Permissions

This package requires the `QUERY_ALL_PACKAGES` permission on Android 11+ (API level 30+). The Expo config plugin automatically adds this permission to your `AndroidManifest.xml`.

## Requirements

-   Expo SDK 52.0.0 or higher (for Expo projects)
-   React Native 0.73.0 or higher
-   Android minSdkVersion 21 or higher

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
