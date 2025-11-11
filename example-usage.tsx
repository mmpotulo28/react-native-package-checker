// Example usage in a React Native app

import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import PackageChecker from "react-native-package-checker";

export default function App() {
	const [chromeInstalled, setChromeInstalled] = useState<boolean | null>(null);
	const [googlePackages, setGooglePackages] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	// Check if Chrome is installed
	const checkChrome = async () => {
		setLoading(true);
		try {
			const isInstalled = await PackageChecker.isPackageAvailable("com.android.chrome");
			setChromeInstalled(isInstalled);
		} catch (error) {
			console.error("Error checking Chrome:", error);
		} finally {
			setLoading(false);
		}
	};

	// Find all Google packages
	const findGooglePackages = async () => {
		setLoading(true);
		try {
			const packages = await PackageChecker.checkPackagesByPattern("^com\\.google\\..*");
			setGooglePackages(packages);
		} catch (error) {
			console.error("Error finding Google packages:", error);
		} finally {
			setLoading(false);
		}
	};

	// Check Chrome on mount
	useEffect(() => {
		checkChrome();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.section}>
				<Text style={styles.title}>Package Checker Example</Text>

				<View style={styles.result}>
					<Text style={styles.label}>Chrome Browser:</Text>
					<Text style={styles.value}>
						{chromeInstalled === null
							? "Checking..."
							: chromeInstalled
							? "✅ Installed"
							: "❌ Not Installed"}
					</Text>
				</View>

				<Button title="Refresh Chrome Status" onPress={checkChrome} disabled={loading} />
			</View>

			<View style={styles.section}>
				<Button
					title="Find Google Packages"
					onPress={findGooglePackages}
					disabled={loading}
				/>

				{googlePackages.length > 0 && (
					<View style={styles.packageList}>
						<Text style={styles.subtitle}>
							Found {googlePackages.length} Google packages:
						</Text>
						{googlePackages.map((pkg, index) => (
							<Text key={index} style={styles.packageName}>
								• {pkg}
							</Text>
						))}
					</View>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	section: {
		marginBottom: 30,
		backgroundColor: "white",
		padding: 15,
		borderRadius: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 10,
	},
	result: {
		marginBottom: 15,
		padding: 10,
		backgroundColor: "#f9f9f9",
		borderRadius: 5,
	},
	label: {
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	value: {
		fontSize: 18,
		fontWeight: "600",
	},
	packageList: {
		marginTop: 15,
	},
	packageName: {
		fontSize: 12,
		fontFamily: "monospace",
		marginVertical: 2,
		color: "#333",
	},
});
