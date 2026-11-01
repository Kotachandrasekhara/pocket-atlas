# Globey Atlas

Geography games for a young explorer, hosted by Globey the globe. One codebase gives you a **website**, an **Android app** and an **iPhone/iPad app**, and all three work **offline**.

**Games:** Mystery Country, Size Showdown, Flag Dash, Capital Rush, Paint the Flag, Capital Pop. There are also flag and capital quizzes for every region, plus stars, ranks and daily streaks.

## How it is organised

| Folder | What is in it |
|---|---|
| `www/` | The whole game: `index.html` (all games and all 192 country flags and 50 US state flags), fonts, icons, `sw.js` for offline use on the website, `site.webmanifest` |
| `android/` | The Android app project (made with Capacitor) |
| `ios/` | The iPhone and iPad app project (made with Capacitor) |
| `assets/` | Source pictures for the app icon and splash screen |
| `.github/workflows/` | Automatic builds: website, Android, iOS |

Progress (stars, streaks, best scores) is saved on each device. In the mobile apps it is also copied to the phone's own storage.

## Offline

- **Mobile apps:** every file is inside the app, so no internet is needed.
- **Website:** the first visit saves the game on the device. After that it opens with no connection.

## Run it on your computer

```
npm install
npm run serve
```

Then open http://localhost:8000. You can also just double-click `www/index.html`.

## Website

Every push to `main` publishes `www/` with GitHub Pages (workflow: **Publish website**). Set it up once under **Settings > Pages > Source: GitHub Actions**.

## Android app

Every push to `main` builds an installable app and attaches it to a release:

1. On the Android phone, open the repository on GitHub, go to **Releases**, and open **Globey Atlas for Android (latest build)**.
2. Download `globey-atlas-android.apk` and open it. Android asks once to allow installs from your browser.

Direct link: `https://github.com/Kotachandrasekhara/pocket-atlas/releases/download/latest-android/globey-atlas-android.apk`

This build is signed with a test key, which is fine for your own devices. For the Google Play Store you need a Google Play developer account (one-time $25), your own signing key, and an app bundle (`./gradlew bundleRelease`).

To work on it in Android Studio: `npm run sync`, then `npm run open:android`.

## iPhone and iPad app

The **Build iOS app** workflow builds the app on a Mac in the cloud on every push. It proves the app compiles and produces a Simulator build you can download from the run's **Artifacts**.

To put it on a real iPhone, or into TestFlight and the App Store, you need a Mac with Xcode and an Apple Developer account ($99 per year):

1. `npm install`, then `npm run sync`, then `npm run open:ios`.
2. In Xcode, select the **App** target, open **Signing & Capabilities**, and choose your Team.
3. Plug in the iPhone and press Run, or use **Product > Archive** to upload to TestFlight.

## Before you publish to the app stores

- **App name and ID:** the app ID `io.github.kotachandrasekhara.globeyatlas` is a placeholder. It is set in `capacitor.config.json`, `android/app/build.gradle` and the Xcode project. Choose the final one before publishing, because it cannot change afterwards.
- **Name check:** search the official trademark registers for the final name.
- **Privacy:** the app collects no personal data and makes no network calls. Write a short privacy policy saying so. Apple and Google both ask for one for apps aimed at children.
- **Flag artwork:** country flags come from the svg-country-flags set. Syria uses the flag adopted after December 2024. Check the artwork licenses before charging money.

## Changing the artwork

Replace the pictures in `assets/`, then run `npm run assets` to regenerate every icon and splash screen. The fonts (Baloo 2 and Lexend) are bundled under the SIL Open Font License, see `www/fonts/FONT-LICENSE.txt`.
