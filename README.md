# CNC Assistant · 828D

Offline-first PWA for practical CNC work around Siemens SINUMERIK 828D / ShopTurn.

## v0.1

- Structured workflow instead of a dashboard full of windows
- Part/job card stored locally in the browser
- Technology route with operations, tool, RPM, feed and depth of cut
- Cutting-speed calculator: Vc → RPM → feed/min
- Offline diagnostics for squeal, vibration, chip problems and size drift
- Local reference cards for AISI 304, metric threads, CNMG/WNMG and ShopTurn
- Tengyue CK52PT-Y machine profile
- Dark/light UI, phone/tablet/desktop responsive layout
- PWA manifest and offline service worker
- GitHub Pages deployment workflow

## Data and privacy

No GPT, no cloud backend and no analytics are required. Job data and operations are kept in `localStorage` on the current device.

## Run locally

Serve the repository with any static HTTP server. Service Workers do not work reliably from `file://` URLs.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Safety

The app is a workshop reference and calculation tool. It does not control the machine. Verify programs, offsets, clamping, tool clearance and cutting data on the actual machine before running a job.
