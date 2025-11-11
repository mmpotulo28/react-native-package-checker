package com.packagechecker;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class PackageCheckerModule extends ReactContextBaseJavaModule {
 private final ReactApplicationContext reactContext;

 public PackageCheckerModule(ReactApplicationContext reactContext) {
  super(reactContext);
  this.reactContext = reactContext;
 }

 @Override
 public String getName() {
  return "PackageChecker";
 }

 /**
  * Check if a specific package is installed on the device
  * 
  * @param packageName The Android package name to check
  * @param promise     Promise to return the result
  */
 @ReactMethod
 public void isPackageAvailable(String packageName, Promise promise) {
  try {
   PackageManager packageManager = reactContext.getPackageManager();

   if (packageName == null || packageName.isEmpty()) {
    promise.reject("INVALID_PACKAGE_NAME", "Package name cannot be null or empty");
    return;
   }

   try {
    PackageInfo packageInfo = packageManager.getPackageInfo(packageName, 0);
    promise.resolve(packageInfo != null);
   } catch (PackageManager.NameNotFoundException e) {
    // Package not found
    promise.resolve(false);
   }
  } catch (Exception e) {
   promise.reject("ERROR", "Failed to check package: " + e.getMessage(), e);
  }
 }

 /**
  * Find all installed packages matching a regex pattern
  * 
  * @param pattern Regex pattern to match package names
  * @param promise Promise to return the array of matching package names
  */
 @ReactMethod
 public void checkPackagesByPattern(String pattern, Promise promise) {
  try {
   PackageManager packageManager = reactContext.getPackageManager();

   if (pattern == null || pattern.isEmpty()) {
    promise.reject("INVALID_PATTERN", "Pattern cannot be null or empty");
    return;
   }

   Pattern regexPattern;
   try {
    regexPattern = Pattern.compile(pattern);
   } catch (PatternSyntaxException e) {
    promise.reject("INVALID_PATTERN", "Invalid regex pattern: " + e.getMessage(), e);
    return;
   }

   List<PackageInfo> installedPackages = packageManager.getInstalledPackages(0);
   WritableArray matchingPackages = new WritableNativeArray();

   for (PackageInfo packageInfo : installedPackages) {
    String packageName = packageInfo.packageName;
    if (regexPattern.matcher(packageName).find()) {
     matchingPackages.pushString(packageName);
    }
   }

   promise.resolve(matchingPackages);
  } catch (Exception e) {
   promise.reject("ERROR", "Failed to check packages by pattern: " + e.getMessage(), e);
  }
 }
}
