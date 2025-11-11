"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const LINKING_ERROR =
	`The package 'react-native-package-checker' doesn't seem to be linked. Make sure: \n\n` +
	react_native_1.Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
	"- You rebuilt the app after installing the package\n" +
	"- You are not using Expo Go\n";
const PackageChecker = react_native_1.NativeModules.PackageChecker
	? react_native_1.NativeModules.PackageChecker
	: new Proxy(
			{},
			{
				get() {
					throw new Error(LINKING_ERROR);
				},
			},
	  );
exports.default = PackageChecker;
