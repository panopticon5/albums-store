# Albums Store

Small Angular demo app that manages a list of albums (in-memory API).  
Includes NgRx Store (actions, reducer, effects), a fake backend service, components for listing, adding and rating albums, and a small utility pipe.

## Features
- List albums (listening / rated)
- Add album (pessimistic flow: UI updates when backend returns success)
- Rate album (updates rating + status)
- In-memory simulated backend (`core/albums.service.ts`)
- NgRx: actions, reducer (entity adapter), selectors, effects
- Simple search/filter support (component-local)
- Range pipe for rendering rating stars

## Project layout (important folders)
- `src/app/albums` — feature (components, models, store)
  - `components/` — UI pieces (albums-list, new-album, dialogs...)
  - `models/album.ts` — album model
  - `store/` — NgRx actions/effects/reducer/selectors
- `src/app/core/albums.service.ts` — simulated backend / in-memory API
- `src/app/utils/range.pipe.ts` — helper pipe for star icons

## Prerequisites
- Node.js (`20.19`+ recommended)
- npm
- Angular CLI (optional, used for some developer commands)

## Quick start

1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
ng serve
```

3. Open the app
- Visit http://localhost:4200

## Useful scripts
- `ng serve` / `npm start` — run dev server
- `ng build` / `npm run build` — build production bundle
- `ng test` / `npm test` — run unit tests (if configured)
- `npm run lint` — run linter (if configured)

(Exact npm script names depend on package.json — use `npm run` to list them.)

## Notes for development / debugging
- Store updates:
  - The app uses a pessimistic add flow: an `addAlbum` action triggers an effect which calls the API and dispatches `addAlbumSuccess`. The reducer handles the success action to add the album to the store.
  - If UI doesn't reflect updates, check actions in Redux DevTools and ensure reducer handles success actions and returns new immutable state.
- IDs:
  - Generated IDs are strings (timestamp + random digits) to avoid JS numeric-precision issues.
- Searching:
  - Implement search locally in the list component (FormControl + debounce) and combine with selectors, or add a selector factory / store field if you want global search state.
- Rating stars:
  - Use the provided `range` pipe to render N star icons: `*ngFor="let _ of (album.rating | range)"`

## Contributing
- Open an issue / PR. Keep changes small and focused.
- Prefer immutability in reducer updates (use the entity adapter helpers).
- For optimistic updates, include a temporary client id and reconcile on success/failure.

## License
MIT
