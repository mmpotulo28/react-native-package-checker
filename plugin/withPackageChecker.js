"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPackageChecker = void 0;
const config_plugins_1 = require("@expo/config-plugins");
/**
 * Check if the MAIN action intent already exists in queries
 */
function hasMainActionIntent(queries) {
	return queries.some((query) => {
		if (!query.intent || !Array.isArray(query.intent)) {
			return false;
		}
		return query.intent.some((intent) => {
			if (!intent.action || !Array.isArray(intent.action)) {
				return false;
			}
			return intent.action.some((action) => {
				var _a;
				return (
					((_a = action.$) === null || _a === void 0 ? void 0 : _a["android:name"]) ===
					"android.intent.action.MAIN"
				);
			});
		});
	});
}
/**
 * Expo config plugin for react-native-package-checker
 * Adds necessary Android permissions to query installed packages
 */
const withPackageChecker = (config) => {
	return (0, config_plugins_1.withAndroidManifest)(config, async (config) => {
		const androidManifest = config.modResults;
		// Add QUERY_ALL_PACKAGES permission for Android 11+ (API 30+)
		// This permission is required to query installed packages
		if (!androidManifest.manifest.queries) {
			androidManifest.manifest.queries = [];
		}
		// Ensure queries element exists
		const queries = androidManifest.manifest.queries;
		if (!Array.isArray(queries)) {
			androidManifest.manifest.queries = [];
		}
		// Add package query intent to allow querying all packages
		const packageIntent = {
			intent: [
				{
					action: [{ $: { "android:name": "android.intent.action.MAIN" } }],
				},
			],
		};
		// Check if the intent already exists
		const existingQueries = Array.isArray(androidManifest.manifest.queries)
			? androidManifest.manifest.queries
			: [];
		if (!hasMainActionIntent(existingQueries)) {
			existingQueries.push(packageIntent);
			androidManifest.manifest.queries = existingQueries;
		}
		return config;
	});
};
exports.withPackageChecker = withPackageChecker;
