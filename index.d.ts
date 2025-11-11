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

declare const PackageChecker: PackageCheckerModule;

export default PackageChecker;
