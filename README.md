# Pocket Atlas

A geography game site for a young explorer. Six daily games, flag and capital quizzes for every region, a mascot called Globey, and a star and rank system.

**Games:** Mystery Country, Size Showdown, Flag Dash, Capital Rush, Paint the Flag, Capital Pop.

The whole site is one file, `index.html`. It has no build step and no server. All 192 country flags and 50 US state flags are built into the file, so it works offline. Progress (stars, streaks, best scores) is saved in the browser on each device.

## Run it on your computer

Double-click `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish it on the internet

This repository deploys itself with GitHub Pages. Each push to `main` runs `.github/workflows/pages.yml` and updates the live site in about a minute.

One-time setup, after the first push: open the repository on GitHub, go to **Settings > Pages**, and set **Source** to **GitHub Actions**.

The site then lives at `https://<your-github-name>.github.io/pocket-atlas/`.

## Notes

- Flags come from the svg-country-flags set. Syria uses the flag adopted after December 2024.
- Country sizes and populations are rounded.
