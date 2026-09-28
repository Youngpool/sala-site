# SALA website prototype

Static multi-route SALA experience built from the supplied implementation spec and packaged SALA masterplan assets.

The site intentionally does not fabricate project descriptions, amenities, events, timelines, or editorial photography. Those content slots remain explicit until verified source material is supplied.

## Run locally

Requirements: Node.js 18 or newer.

```powershell
node server.cjs
```

Then open <http://127.0.0.1:4173/>.

The current homepage introduction section is available at
<http://127.0.0.1:4173/#introduction>.

## Project structure

- `dist/` contains the complete static website and all bundled assets.
- `dist/assets/app.js` contains the page markup and interactions.
- `dist/assets/site.css` contains the site styles and responsive layouts.
- `server.cjs` is the local static preview server.
- `.openai/hosting.json` contains the existing static-hosting configuration.

There is no build step or package installation required for the current
prototype. Edit the files in `dist/`, restart the server when needed, and
refresh the browser.
