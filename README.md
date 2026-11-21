# music-lib

Music theory, notation rendering and audio shared by
[chord_almanac](https://github.com/thecodedproject/chord_almanac) and
[learn-music-notation](https://github.com/thecodedproject/learn-music-notation).

It is one package with three entry points:

| Import | What | Depends on |
|---|---|---|
| `music-lib/theory` | Notes, spelled pitches, clefs, key signatures, scales and keys, spelled intervals, chord naming and parsing, voicings, solfège | nothing |
| `music-lib/audio` | `PatternPlayer` (look-ahead looping player with metronome) and `NotePlayer` (short phrases for ear training, with a soft struck voice) | Web Audio |
| `music-lib/react` | `Stave`: an SVG stave in treble or bass clef with key and time signatures, accidentals, rests, beams, tuplets, ledger lines, open and dotted notes, per-note classes and an `overlay` for drawing over (or taking input on) the stave | React (peer) |

Import the stave's styles with `import "music-lib/react/stave.css"`.

## Using it from an app

```json
"dependencies": { "music-lib": "github:thecodedproject/music-lib#v0.1.0" }
```

Installing from git runs `prepare`, which builds `dist/` (ESM for bundlers, CommonJS for jest).

To work on the library and an app together, link it instead: `"music-lib": "link:../music-lib"`
and run `yarn build` here after changes. A linked copy brings its own `react` and `@types/react`
from its dev dependencies, so the apps point both at their own copies (see `resolve.alias` in
their `webpack.config.js`, `moduleNameMapper` in `jest.config.ts` and `paths` in `tsconfig.json`).

## Developing

```
yarn test       # jest
yarn typecheck
yarn build      # dist/esm and dist/cjs
```
