# CNC Assistant · 828D

Offline-first workshop PWA for practical CNC work around **Tengyue CK52PT-Y / Siemens SINUMERIK 828D / ShopTurn**.

## v0.2

The app stays intentionally structured around one job instead of turning into a dashboard full of unrelated windows.

### Current workflow

- Part/job card stored locally in the browser
- Technology route with operations, tool, RPM, feed and depth of cut
- Edit and reorder operations
- Automatic warning when an operation exceeds the machine profile spindle limit (4000 rpm)
- 15-position BMT40 turret map with tool, insert, stickout and notes
- Turret tools available when creating an operation
- Cutting calculator: Vc → RPM → feed/min with machine-limit check
- Offline diagnostics for squeal, vibration, chip problems and size drift
- Setup checklist before first run
- Measurement log with nominal, upper/lower deviation and in/out-of-tolerance status
- Project export/import as local JSON backup
- Local reference cards for AISI 304, metric threads, CNMG/WNMG and ShopTurn
- Dark/light UI and responsive phone/tablet/desktop layout
- PWA manifest and offline service worker

## Data and privacy

No GPT, cloud backend or analytics are required. Job data, route, turret, measurements and setup state are stored in `localStorage` on the current device.

The project export creates a `.cnc828.json` file so a job can be backed up or moved to another device without a server.

## Run locally

Serve the repository with any static HTTP server. Service Workers do not work reliably from `file://` URLs.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

The repository is ready to publish directly from the `main` branch/root using GitHub Pages.

## Safety

This is a workshop reference, planning and calculation tool. It does **not** control the CNC machine. Verify programs, offsets, clamping, tool clearance and cutting data on the actual machine before running a job.
