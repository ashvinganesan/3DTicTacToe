/* 3D Tic-Tac-Toe, 3x3x3, two-player hotseat */
if (typeof THREE === 'undefined') {
  const el = document.getElementById('status') || document.body;
  if (el) el.textContent = 'Failed to load Three.js. Check network/CORS.';
  console.error('3DTTT: Missing THREE');
  throw new Error('Missing THREE');
}

window.addEventListener('error', function (e) {
  const el = document.getElementById('status') || document.body;
  if (el) el.textContent = 'Error: ' + e.message;
});

// Debug: log engine exports if present
function logEngineAvailability(context) {
  const available = typeof window.ttt_bestMove === 'function' ? 'window.ttt_bestMove' :
    (typeof window.WebEntry !== 'undefined' && typeof window.WebEntry.ttt_bestMove === 'function' ? 'WebEntry.ttt_bestMove' :
    (typeof window.tttweb_WebEntry !== 'undefined' && typeof window.tttweb_WebEntry.ttt_bestMove === 'function' ? 'tttweb_WebEntry.ttt_bestMove' : 'none'));
  console.log(`[3dttt] Engine availability (${context}):`, available);
}
logEngineAvailability('onLoad');

// Scene setup
const appContainer = document.getElementById('app');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1116);

// Debug helper to ensure something renders
const axes = new THREE.AxesHelper(3);
scene.add(axes);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(6, 6, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
appContainer.appendChild(renderer.domElement);

// Minimal orbit controls replacement (avoid external OrbitControls dependency)
function createSimpleOrbitControls(camera, domElement) {
  const state = {
    dragging: false,
    startX: 0,
    startY: 0,
    theta: Math.PI / 4,
    phi: Math.PI / 4,
    radius: 8,
    target: new THREE.Vector3(0, 0, 0)
  };

  function updateCamera() {
    const eps = 0.001;
    state.phi = Math.max(eps, Math.min(Math.PI - eps, state.phi));
    const sinPhi = Math.sin(state.phi);
    camera.position.x = state.target.x + state.radius * sinPhi * Math.sin(state.theta);
    camera.position.y = state.target.y + state.radius * Math.cos(state.phi);
    camera.position.z = state.target.z + state.radius * sinPhi * Math.cos(state.theta);
    camera.lookAt(state.target);
  }

  function onMouseDown(e) {
    state.dragging = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
  }

  function onMouseMove(e) {
    if (!state.dragging) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    state.startX = e.clientX;
    state.startY = e.clientY;
    const rotSpeed = 0.005;
    state.theta -= dx * rotSpeed;
    state.phi -= dy * rotSpeed;
    updateCamera();
  }

  function onMouseUp() {
    state.dragging = false;
  }

  function onWheel(e) {
    const zoomFactor = 1 + Math.sign(e.deltaY) * 0.1;
    state.radius = Math.max(2, Math.min(50, state.radius * zoomFactor));
    updateCamera();
  }

  domElement.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  // Pointer events for broader device support
  if (domElement && domElement.style) {
    domElement.style.touchAction = 'none';
  }
  domElement.addEventListener('pointerdown', onMouseDown);
  window.addEventListener('pointermove', onMouseMove);
  window.addEventListener('pointerup', onMouseUp);
  domElement.addEventListener('wheel', onWheel, { passive: true });

  updateCamera();
  return { update: updateCamera, target: state.target };
}

const controls = createSimpleOrbitControls(camera, renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Board state
const BOARD_SIZE = 4; // 4x4x4
const EMPTY = 0;
const PLAYER_X = 1; // red
const PLAYER_O = 2; // blue

let currentPlayer = PLAYER_X;
let moveCount = 0;
const board = new Array(BOARD_SIZE * BOARD_SIZE * BOARD_SIZE).fill(EMPTY);

function indexFromXYZ(x, y, z) {
  return x + BOARD_SIZE * (y + BOARD_SIZE * z);
}

function getCell(x, y, z) {
  return board[indexFromXYZ(x, y, z)];
}

function setCell(x, y, z, value) {
  board[indexFromXYZ(x, y, z)] = value;
}

// Geometry
const cellGroup = new THREE.Group();
scene.add(cellGroup);

const cellSize = 0.75; // smaller tiles
const cellSpacing = 1.0; // tighter spacing to leave visible gaps
const half = (BOARD_SIZE - 1) / 2;
const tileGeometry = new THREE.PlaneGeometry(cellSize, cellSize);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2f3a, metalness: 0.1, roughness: 0.8, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
const hoverMaterial = new THREE.MeshStandardMaterial({ color: 0x3a4050, metalness: 0.1, roughness: 0.7, side: THREE.DoubleSide });
const xMaterial = new THREE.MeshStandardMaterial({ color: 0xff5a5a, metalness: 0.2, roughness: 0.5, side: THREE.DoubleSide });
const oMaterial = new THREE.MeshStandardMaterial({ color: 0x5aa7ff, metalness: 0.2, roughness: 0.5, side: THREE.DoubleSide });

const cells = []; // {mesh, x,y,z}

for (let z = 0; z < BOARD_SIZE; z += 1) {
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const mesh = new THREE.Mesh(tileGeometry, baseMaterial.clone());
      mesh.rotation.x = -Math.PI / 2; // lay flat (XZ plane)
      mesh.position.set(
        (x - half) * cellSpacing,
        (z - half) * cellSpacing, // height by layer
        (y - half) * cellSpacing  // row maps to world Z
      );
      mesh.userData = { x, y, z };
      cellGroup.add(mesh);
      cells.push(mesh);
    }
  }
}

// Grid helpers per layer
const gridColor = 0x656b7f;
for (let z = 0; z < BOARD_SIZE; z += 1) {
  const grid = new THREE.GridHelper(BOARD_SIZE * cellSpacing, BOARD_SIZE, gridColor, gridColor);
  grid.rotation.x = 0; // Grid lies in XZ plane by default
  grid.position.set(0, (z - half) * cellSpacing, 0);
  grid.material.opacity = 0.25;
  grid.material.transparent = true;
  scene.add(grid);
}

// Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredCell = null;
let pointerDown = false;
let pointerDownCell = null;
let pointerDownPosX = 0;
let pointerDownPosY = 0;
let movedBeyondTolerance = false;
const DRAG_TOLERANCE_PX = 6;

function onPointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  if (pointerDown) {
    const dx = event.clientX - pointerDownPosX;
    const dy = event.clientY - pointerDownPosY;
    if ((dx*dx + dy*dy) > (DRAG_TOLERANCE_PX * DRAG_TOLERANCE_PX)) {
      movedBeyondTolerance = true;
    }
  }
}

function pickCellUnderPointer() {
  raycaster.setFromCamera(mouse, camera);
  const intersections = raycaster.intersectObjects(cells);
  return intersections.length > 0 ? intersections[0].object : null;
}

function onPointerDown(e) {
  pointerDown = true;
  movedBeyondTolerance = false;
  pointerDownPosX = e.clientX;
  pointerDownPosY = e.clientY;
  // Update mouse from the down event to avoid stale coordinates
  {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  pointerDownCell = pickCellUnderPointer();
}

function onPointerUp(e) {
  const startedOnCell = pointerDown && pointerDownCell !== null;
  pointerDown = false;
  // Update mouse from the up event then pick
  {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  const endCell = pickCellUnderPointer();
  if (!startedOnCell || movedBeyondTolerance || endCell !== pointerDownCell) {
    pointerDownCell = null;
    return;
  }
  if (gameOver) return;
  if (useAI && currentPlayer === PLAYER_O) return;
  const mesh = endCell;
  const { x, y, z } = mesh.userData;
  if (getCell(x, y, z) !== EMPTY) {
    pointerDownCell = null;
    return;
  }
  setCell(x, y, z, currentPlayer);
  mesh.material = currentPlayer === PLAYER_X ? xMaterial.clone() : oMaterial.clone();
  moveCount += 1;
  const line = checkWin();
  if (line) {
    setStatusText(`${currentPlayer === PLAYER_X ? 'X' : 'O'} wins!`);
    highlightWinningLine(line);
    gameOver = true;
    pointerDownCell = null;
    return;
  }
  if (moveCount === BOARD_SIZE * BOARD_SIZE * BOARD_SIZE) {
    setStatusText('Draw');
    gameOver = true;
    pointerDownCell = null;
    return;
  }
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  setStatusText(`Turn: ${currentPlayer === PLAYER_X ? 'X' : 'O'}`);
  pointerDownCell = null;
  if (useAI && currentPlayer === PLAYER_O && !gameOver) {
    setTimeout(aiMove, 0);
  }
}

renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });
renderer.domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
renderer.domElement.addEventListener('pointerup', onPointerUp, { passive: true });
renderer.domElement.addEventListener('pointercancel', () => { pointerDown = false; pointerDownCell = null; movedBeyondTolerance = false; });

// Hover effect
function updateHover() {
  if (gameOver) return;
  raycaster.setFromCamera(mouse, camera);
  const intersections = raycaster.intersectObjects(cells);
  let newHover = null;
  for (const cell of cells) {
    // Reset non-owned cells to base color
    const { x, y, z } = cell.userData;
    if (getCell(x, y, z) === EMPTY) {
      cell.material.color.copy(baseMaterial.color);
    }
  }
  if (intersections.length > 0) {
    const mesh = intersections[0].object;
    const { x, y, z } = mesh.userData;
    if (getCell(x, y, z) === EMPTY) {
      mesh.material.color.copy(hoverMaterial.color);
      newHover = mesh;
    }
  }
  hoveredCell = newHover;
}

// Winning lines precomputation (generic for BOARD_SIZE)
const winningLines = [];

function addLine(points) {
  winningLines.push(points);
}

// Lines along axes
for (let z = 0; z < BOARD_SIZE; z += 1) {
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    const line = [];
    for (let x = 0; x < BOARD_SIZE; x += 1) line.push([x, y, z]);
    addLine(line);
  }
}
for (let z = 0; z < BOARD_SIZE; z += 1) {
  for (let x = 0; x < BOARD_SIZE; x += 1) {
    const line = [];
    for (let y = 0; y < BOARD_SIZE; y += 1) line.push([x, y, z]);
    addLine(line);
  }
}
for (let y = 0; y < BOARD_SIZE; y += 1) {
  for (let x = 0; x < BOARD_SIZE; x += 1) {
    const line = [];
    for (let z = 0; z < BOARD_SIZE; z += 1) line.push([x, y, z]);
    addLine(line);
  }
}

// Plane diagonals
for (let z = 0; z < BOARD_SIZE; z += 1) {
  const d1 = [], d2 = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    d1.push([i, i, z]);
    d2.push([BOARD_SIZE - 1 - i, i, z]);
  }
  addLine(d1); addLine(d2);
}
for (let y = 0; y < BOARD_SIZE; y += 1) {
  const d1 = [], d2 = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    d1.push([i, y, i]);
    d2.push([BOARD_SIZE - 1 - i, y, i]);
  }
  addLine(d1); addLine(d2);
}
for (let x = 0; x < BOARD_SIZE; x += 1) {
  const d1 = [], d2 = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    d1.push([x, i, i]);
    d2.push([x, BOARD_SIZE - 1 - i, i]);
  }
  addLine(d1); addLine(d2);
}

// Space diagonals
{
  const d1 = [], d2 = [], d3 = [], d4 = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    d1.push([i, i, i]);
    d2.push([i, i, BOARD_SIZE - 1 - i]);
    d3.push([i, BOARD_SIZE - 1 - i, i]);
    d4.push([BOARD_SIZE - 1 - i, i, i]);
  }
  addLine(d1); addLine(d2); addLine(d3); addLine(d4);
}

function checkWin() {
  for (const line of winningLines) {
    const first = line[0];
    let v = getCell(first[0], first[1], first[2]);
    if (v === EMPTY) continue;
    let all = true;
    for (let i = 1; i < line.length; i += 1) {
      const p = line[i];
      if (getCell(p[0], p[1], p[2]) !== v) { all = false; break; }
    }
    if (all) return line;
  }
  return null;
}

function highlightWinningLine(line) {
  const highlightMaterial = new THREE.MeshStandardMaterial({ color: 0xffe27a, emissive: 0x4d3b00, emissiveIntensity: 0.6, metalness: 0.2, roughness: 0.4 });
  for (const cell of cells) {
    const { x, y, z } = cell.userData;
    const onLine = line.some(([lx, ly, lz]) => lx === x && ly === y && lz === z);
    if (onLine) {
      cell.material = highlightMaterial.clone();
    } else {
      cell.material.opacity = 0.2;
      cell.material.transparent = true;
    }
  }
}

// UI
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const aiToggleBtn = document.getElementById('aiToggle');
let useAI = false; // AI plays O
let engineWorker = null;
function ensureWorker() {
  if (!engineWorker) {
    try {
      engineWorker = new Worker('./app/engine-worker.js');
      engineWorker.onmessage = (e) => {
        const msg = e.data || {};
        if (msg.type === 'bestMoveResult') {
          if (!msg.ok) {
            console.warn('Engine worker error:', msg.error);
            useAI = false;
            if (aiToggleBtn) aiToggleBtn.textContent = 'AI: Off';
            return;
          }
          const { x, y, z } = msg.move;
          if (getCell(x, y, z) === EMPTY && !gameOver && currentPlayer === PLAYER_O) {
            applyAIMove(x, y, z);
          }
        }
      };
    } catch (e) {
      console.warn('Failed to start engine worker', e);
    }
  }
}

function setStatusText(text) {
  statusEl.textContent = text;
}

function resetGame() {
  for (let i = 0; i < board.length; i += 1) board[i] = EMPTY;
  moveCount = 0;
  currentPlayer = PLAYER_X;
  setStatusText('Turn: X');
  gameOver = false;
  for (const cell of cells) {
    cell.material = baseMaterial.clone();
    cell.material.opacity = 1;
    cell.material.transparent = false;
  }
}

resetBtn.addEventListener('click', resetGame);
if (aiToggleBtn) {
  aiToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    useAI = !useAI;
    aiToggleBtn.textContent = `AI: ${useAI ? 'On' : 'Off'}`;
    if (useAI) ensureWorker();
    logEngineAvailability('toggle');
    if (useAI && currentPlayer === PLAYER_O && !gameOver) {
      setTimeout(aiMove, 0);
    }
  });
}

let gameOver = false;

// Render loop
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  updateHover();
  renderer.render(scene, camera);
}
animate();

// --- AI integration ---
function boardToEngineString() {
  let s = '';
  for (let z = 0; z < BOARD_SIZE; z += 1) {
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        const v = getCell(x, y, z);
        s += v === EMPTY ? '.' : (v === PLAYER_X ? 'X' : 'O');
      }
    }
  }
  return s;
}

function applyAIMove(x, y, z) {
  if (currentPlayer !== PLAYER_O) {
    console.warn('Ignoring AI move because it is not O\'s turn');
    return;
  }
  setCell(x, y, z, PLAYER_O);
  for (const cell of cells) {
    const d = cell.userData;
    if (d.x === x && d.y === y && d.z === z) {
      cell.material = oMaterial.clone();
      break;
    }
  }
  moveCount += 1;
  const line = checkWin();
  if (line) {
    setStatusText('O wins!');
    highlightWinningLine(line);
    gameOver = true;
    return;
  }
  if (moveCount === BOARD_SIZE * BOARD_SIZE * BOARD_SIZE) {
    setStatusText('Draw');
    gameOver = true;
    return;
  }
  currentPlayer = PLAYER_X;
  setStatusText('Turn: X');
}

function getBestMoveFn() {
  if (typeof window.ttt_bestMove === 'function') return window.ttt_bestMove;
  if (typeof window.$rt_exports !== 'undefined' && typeof window.$rt_exports.ttt_bestMove === 'function') return window.$rt_exports.ttt_bestMove;
  if (typeof window.WebEntry !== 'undefined' && typeof window.WebEntry.ttt_bestMove === 'function') return window.WebEntry.ttt_bestMove;
  if (typeof window.tttweb_WebEntry !== 'undefined' && typeof window.tttweb_WebEntry.ttt_bestMove === 'function') return window.tttweb_WebEntry.ttt_bestMove;
  return null;
}

function aiMove() {
  const bestMoveFn = getBestMoveFn();
  ensureWorker();
  if (engineWorker) {
    engineWorker.postMessage({ type: 'bestMove', board: boardToEngineString(), player: 'O' });
    return;
  }
  if (!bestMoveFn) {
    console.warn('AI engine not available');
    useAI = false;
    if (aiToggleBtn) aiToggleBtn.textContent = 'AI: Off';
    return;
  }
  try {
    const boardStr = boardToEngineString();
    let res = bestMoveFn(boardStr, 'O'.charCodeAt(0));
    if (!res || typeof res[0] !== 'number') {
      // Try with string player param as fallback
      res = bestMoveFn(boardStr, 'O');
    }
    if (!res || typeof res[0] !== 'number') {
      console.warn('Engine returned invalid move:', res);
      useAI = false;
      if (aiToggleBtn) aiToggleBtn.textContent = 'AI: Off';
      return;
    }
    const [mx, my, mz] = res;
    if (getCell(mx, my, mz) !== EMPTY) {
      console.warn('Engine suggested occupied cell, ignoring');
      return;
    }
    applyAIMove(mx, my, mz);
  } catch (e) {
    console.error('AI move failed:', e);
  }
}

