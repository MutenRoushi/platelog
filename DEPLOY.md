# Deploy Platelog (offline PWA)

## Option 1 — GitHub Pages with gh CLI (from Termux/Ubuntu)

    unzip platelog-pwa.zip -d platelog && cd platelog
    git init -b main && git add -A && git commit -m "Platelog PWA"
    gh repo create platelog --public --source=. --push
    gh api -X POST repos/MutenRoushi/platelog/pages -f "source[branch]=main" -f "source[path]=/"

App URL (allow ~1–2 min for first build):

    https://mutenroushi.github.io/platelog/

## Option 2 — no gh CLI

1. Create an empty public repo called `platelog` on github.com
2. `git init -b main && git add -A && git commit -m "Platelog PWA"`
3. `git remote add origin https://github.com/MutenRoushi/platelog.git && git push -u origin main`
4. Repo → Settings → Pages → Source: `main` branch, `/ (root)` → Save

## Install on the phone

1. Open the URL in Chrome **once while online**
2. Chrome menu (⋮) → **Add to Home screen** → **Install**
3. Done. The icon opens full-screen and works with airplane mode on.
   Only the Jeff Nippard demo videos need internet — they stream from YouTube.

## Updating later

Edit files, commit, push. Then bump the cache version in `sw.js`
(`platelog-v1` → `platelog-v2`) so installed phones pick up the new build
on their next online launch.

## Backups

Your log lives in the browser's storage on the phone. Use **Exercises →
Export log** now and then — it downloads a JSON you can re-import if you
ever clear browser data or switch phones.
