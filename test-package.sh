#!/bin/bash

# Quick Test Script for react-native-package-checker
# This script helps you quickly test the package in a new Expo app

set -e

echo "🚀 Testing react-native-package-checker"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the package root."
    exit 1
fi

# Create a test directory
TEST_DIR="../test-package-checker-app"

echo "📁 Creating test Expo app in $TEST_DIR..."
npx create-expo-app@latest "$TEST_DIR" --template blank

# Navigate to test app
cd "$TEST_DIR"

echo ""
echo "📦 Installing react-native-package-checker from local directory..."
npm install ../react-native-package-checker

echo ""
echo "🔧 Adding plugin to app.json..."
# Add plugin to app.json using Node
node -e "
const fs = require('fs');
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
if (!appJson.expo.plugins) {
  appJson.expo.plugins = [];
}
appJson.expo.plugins.push('react-native-package-checker');
fs.writeFileSync('app.json', JSON.stringify(appJson, null, 2));
console.log('✅ Plugin added to app.json');
"

echo ""
echo "📝 Creating test component..."
cat > App.js << 'EOF'
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import PackageChecker from 'react-native-package-checker';

export default function App() {
  const [chromeInstalled, setChromeInstalled] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkChrome = async () => {
    try {
      const isInstalled = await PackageChecker.isPackageAvailable('com.android.chrome');
      setChromeInstalled(isInstalled);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const findGooglePackages = async () => {
    setLoading(true);
    try {
      const result = await PackageChecker.checkPackagesByPattern('com\\.google\\..*');
      setPackages(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkChrome();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Package Checker Test</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Chrome Status:</Text>
        <Text style={styles.value}>
          {chromeInstalled === null ? 'Checking...' : chromeInstalled ? '✅ Installed' : '❌ Not Found'}
        </Text>
        <Button title="Refresh" onPress={checkChrome} />
      </View>

      <View style={styles.section}>
        <Button title="Find Google Packages" onPress={findGooglePackages} disabled={loading} />
        {packages.length > 0 && (
          <View style={styles.results}>
            <Text style={styles.subtitle}>Found {packages.length} packages:</Text>
            {packages.slice(0, 10).map((pkg, i) => (
              <Text key={pkg} style={styles.package}>• {pkg}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 30, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8 },
  label: { fontSize: 16, marginBottom: 5 },
  value: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  subtitle: { fontSize: 14, fontWeight: '600', marginTop: 10, marginBottom: 5 },
  package: { fontSize: 12, fontFamily: 'monospace' },
  results: { marginTop: 10 }
});
EOF

echo "✅ Test component created"
echo ""
echo "🔨 Running Expo prebuild..."
npx expo prebuild --platform android

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. cd $TEST_DIR"
echo "   2. npx expo run:android"
echo ""
echo "   Or use EAS Build:"
echo "   1. cd $TEST_DIR"
echo "   2. eas build --platform android --profile development"
echo ""
echo "📱 The app will test both native methods:"
echo "   - Check if Chrome is installed"
echo "   - Find all Google packages"
echo ""
