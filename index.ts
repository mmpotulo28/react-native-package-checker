import { NativeModules, Platform } from "react-native";

const LINKING_ERROR =
	`The package 'react-native-package-checker' doesn't seem to be linked. Make sure: \n\n` +
	Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
	"- You rebuilt the app after installing the package\n" +
	"- You are not using Expo Go\n";

const PackageChecker = NativeModules.PackageChecker
	? NativeModules.PackageChecker
	: new Proxy(
			{},
			{
				get() {
					throw new Error(LINKING_ERROR);
				},
			},
	  );

export interface PackageCheckerModule {
	/**
	 * Check if a specific Android package is installed on the device
	 * @param packageName - The Android package name (e.g., "com.android.chrome")
	 * @returns Promise that resolves to true if package is installed, false otherwise
	 */
	isPackageAvailable(packageName: string): Promise<boolean>;

	/**
	 * Find all installed packages matching a pattern
	 * @param pattern - A regex pattern to match package names (e.g., "com.google.*")
	 * @returns Promise that resolves to an array of matching package names
	 */
	checkPackagesByPattern(pattern: string): Promise<string[]>;
}

export default PackageChecker as PackageCheckerModule;
