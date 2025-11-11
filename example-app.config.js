// Example usage in an Expo app's app.json or app.config.js

module.exports = {
	expo: {
		name: "My App",
		slug: "my-app",
		version: "1.0.0",
		plugins: [
			// Add the package checker plugin
			"react-native-package-checker",
		],
		android: {
			package: "com.myapp",
		},
	},
};
