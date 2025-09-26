# 3D Tic‑Tac‑Toe (4×4×4) — TeaVM + Three.js

Live: https://games.ashvinganesan.me/3dttt/

## Overview
This project brings my high‑school Alpha‑Beta Tic‑Tac‑Toe project to the web with an interactive 3D board. I originally wrote the AI four years ago in an AI course at Woodside Priory High School taught by Mr. Richard Paige. I transformed the original  chat based game into a playable WebGL game with minor animations, and deployment through GitHub Pages.

## Features
- 4×4×4 board with generic win‑line detection
- Java Alpha‑Beta engine compiled to JavaScript via TeaVM
- Time‑budgeted AI (Web Worker) to keep the UI responsive
- Three.js rendering with orbit camera, hover highlights, win‑line glow
- Physical tile “sheets” and 3D X/O markers with subtle pop‑in/flash animations
- 100% client‑side (no backend)

## Tech Stack
- Engine: Java (Alpha‑Beta pruning) → TeaVM (AOT to JS)
- UI: Three.js + pointer/raycast interaction
- Threading: Web Worker for off‑main‑thread AI
- Build: Maven (teavm-maven-plugin)
- Hosting: GitHub Pages (static)

## How it Works
- The Java facade `tttweb.TTTEngine` exposes `bestMove`/`applyMove` to JS via TeaVM.
- A Web Worker loads the TeaVM bundle and calls the engine so the UI never blocks.
- The main thread updates the 3D scene: places a 3D marker (X or O), runs a short pop‑in/flash animation, checks wins, and advances the turn.

### Engine time budget example
```java
// src/tttweb/TTTEngine.java
search.setTimeBudgetMs(1200); // per move; tuned for strength vs. latency
```

### Web Worker request
```js
// docs/3dttt/main.js
engineWorker.postMessage({ type: 'bestMove', board: boardToEngineString(), player: 'O'.charCodeAt(0) });
```

## Build & Run
Prereqs: Java 17+, Maven

1) Build TeaVM bundle
```bash
mvn -q -DskipTests package
```
Artifacts are written under `docs/3dttt/app/` (e.g., `app.js`).

2) Local preview (any static server)
```bash
# Python 3
python3 -m http.server -d docs/3dttt 8080
# then open http://localhost:8080
```

3) Deploy
Published via GitHub Pages from the `gh-pages` branch. Pushing updates the site.

## Notes on Performance
- AI runs in a Web Worker with a strict time budget so the UI never stalls.
- 4×4×4 search space is large; iterative improvements focused on move ordering, time budgeting, and early cutoffs.

## Acknowledgments
I was so fortunate to attend Woodside Priory High School, and get to take advanced CS classes under Mr. Richard Paige. He is an exceptional teacher who has truely changed my life! His classes are indepth and advanced and honestly better than just about every college class I've taken. You can easily tell how much time He puts into his class from providing initial starter code for most of the homeworks, to the super detailed feedback every students gets on the code they submit. He also volunteered at the Robotics club and for that I'm also super grateful. His commitment to every student has really shaped so many of the robotics club and computer science student's lives and I am beyond grateful for all the time and energy he has put into me and others. We really love you Mr. Paige :)  
