function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  showDownloadSuccess(filename);
}

function showDownloadSuccess(filename) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-asee-blue text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
  notification.innerHTML = `Downloaded: ${filename.split('/').pop()}`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function downloadAASA() {
  const content = '{\n  "applinks": {\n    "apps": [],\n    "details": [\n      {\n        "appID": "TEAMID.BUNDLEID",\n        "paths": [\n          "/products/*",\n          "/help",\n          "/profile/*",\n          "/orders/*"\n        ]\n      }\n    ]\n  }\n}';
  downloadFile(content, 'apple-app-site-association');
}

function downloadAssetLinks() {
  const content = '[{\n  "relation": ["delegate_permission/common.handle_all_urls"],\n  "target": {\n    "namespace": "android_app",\n    "package_name": "com.example.myapp",\n    "sha256_cert_fingerprints": [\n      "12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF"\n    ]\n  }\n}]';
  downloadFile(content, 'assetlinks.json', 'application/json');
}

function downloadFallbackHTML() {
  const content = '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Get Our App</title>\n    <style>\n        body {\n            font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;\n            max-width: 400px;\n            margin: 50px auto;\n            padding: 20px;\n            text-align: center;\n            background: #f8f9fa;\n        }\n        .app-icon {\n            width: 80px;\n            height: 80px;\n            border-radius: 16px;\n            margin-bottom: 20px;\n            background: #007AFF;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: white;\n            font-size: 32px;\n            margin: 0 auto 20px;\n        }\n        .download-buttons {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            gap: 10px;\n            flex-wrap: nowrap;\n        }\n        .download-btn {\n            display: inline-block;\n            padding: 12px 24px;\n            background: #007AFF;\n            color: white;\n            text-decoration: none;\n            border-radius: 8px;\n            font-weight: 500;\n            transition: opacity 0.2s;\n        }\n        .download-btn:hover {\n            opacity: 0.8;\n        }\n        .download-btn.android {\n            background: #34A853;\n        }\n        .card {\n            background: white;\n            border-radius: 16px;\n            padding: 32px;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n        }\n    </style>\n</head>\n<body>\n    <div class="card">\n        <div class="app-icon">📱</div>\n        <h1>Get Our App</h1>\n        <p>For the best experience, download our mobile app:</p>\n        \n        <div class="download-buttons">\n            <a href="https://apps.apple.com/app/idXXXXXXXX" aria-label="Download on the App Store">\n                <img src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"\n                    alt="Download on the App Store" width="180" />\n            </a>\n\n            <a href="https://play.google.com/store/apps/details?id=com.example.myapp" aria-label="Get it on Google Play">\n                <img src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"\n                    alt="Get it on Google Play" width="180" />\n            </a>\n        </div>\n\n        <p><small>Or <a href="/web-version">continue in browser</a></small></p>\n    </div>\n</body>\n</html>';
  downloadFile(content, 'app-fallback.html', 'text/html');
}

function downloadAndroidManifest() {
  const content = '<activity android:name=".MainActivity">\n    <!-- Universal/App Links Intent Filter -->\n    <intent-filter android:autoVerify="true">\n        <action android:name="android.intent.action.VIEW" />\n        <category android:name="android.intent.category.DEFAULT" />\n        <category android:name="android.intent.category.BROWSABLE" />\n        <data android:scheme="https"\n              android:host="yourdomain.com"\n              android:pathPrefix="/products" />\n    </intent-filter>\n    \n    <intent-filter android:autoVerify="true">\n        <action android:name="android.intent.action.VIEW" />\n        <category android:name="android.intent.category.DEFAULT" />\n        <category android:name="android.intent.category.BROWSABLE" />\n        <data android:scheme="https"\n              android:host="yourdomain.com"\n              android:pathPrefix="/profile" />\n    </intent-filter>\n    \n    <intent-filter android:autoVerify="true">\n        <action android:name="android.intent.action.VIEW" />\n        <category android:name="android.intent.category.DEFAULT" />\n        <category android:name="android.intent.category.BROWSABLE" />\n        <data android:scheme="https"\n              android:host="yourdomain.com"\n              android:pathPrefix="/orders" />\n    </intent-filter>\n    \n    <!-- Custom URL Scheme for fallback -->\n    <intent-filter>\n        <action android:name="android.intent.action.VIEW" />\n        <category android:name="android.intent.category.DEFAULT" />\n        <category android:name="android.intent.category.BROWSABLE" />\n        <data android:scheme="myapp" />\n    </intent-filter>\n</activity>';
  downloadFile(content, 'AndroidManifest-DeepLinks.xml', 'text/xml');
}

window.downloadAASA = downloadAASA;
window.downloadAssetLinks = downloadAssetLinks;
window.downloadFallbackHTML = downloadFallbackHTML;
window.downloadAndroidManifest = downloadAndroidManifest;