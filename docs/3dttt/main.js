/* 3D Tic-Tac-Toe, 3x3x3, two-player hotseat */

// Scene setup
const appContainer = document.getElementById('app');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1116);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(6, 6, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
appContainer.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Board state
const BOARD_SIZE = 3; // 3x3x3
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

const cellSize = 0.9;
const cellSpacing = 1.2;
const cubeGeometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2f3a, metalness: 0.1, roughness: 0.8 });
const hoverMaterial = new THREE.MeshStandardMaterial({ color: 0x3a4050, metalness: 0.1, roughness: 0.7 });
const xMaterial = new THREE.MeshStandardMaterial({ color: 0xff5a5a, metalness: 0.2, roughness: 0.5 });
const oMaterial = new THREE.MeshStandardMaterial({ color: 0x5aa7ff, metalness: 0.2, roughness: 0.5 });

const cells = []; // {mesh, x,y,z}

for (let z = 0; z < BOARD_SIZE; z += 1) {
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const mesh = new THREE.Mesh(cubeGeometry, baseMaterial.clone());
      mesh.position.set(
        (x - 1) * cellSpacing,
        (y - 1) * cellSpacing,
        (z - 1) * cellSpacing
      );
      mesh.userData = { x, y, z };
      cellGroup.add(mesh);
      cells.push(mesh);
    }
  }
}

// Grid helpers per layer
const gridColor = 0x4a5063;
for (let z = 0; z < BOARD_SIZE; z += 1) {
  const grid = new THREE.GridHelper(BOARD_SIZE * cellSpacing, BOARD_SIZE, gridColor, gridColor);
  grid.rotation.x = Math.PI / 2;
  grid.position.set(0, (z - 1) * cellSpacing, 0);
  grid.material.opacity = 0.25;
  grid.material.transparent = true;
  scene.add(grid);
}

// Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredCell = null;

function onPointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function onClick() {
  if (gameOver) return;
  raycaster.setFromCamera(mouse, camera);
  const intersections = raycaster.intersectObjects(cells);
  if (intersections.length === 0) return;
  const mesh = intersections[0].object;
  const { x, y, z } = mesh.userData;
  if (getCell(x, y, z) !== EMPTY) return;

  setCell(x, y, z, currentPlayer);
  mesh.material = currentPlayer === PLAYER_X ? xMaterial.clone() : oMaterial.clone();
  moveCount += 1;

  const line = checkWin();
  if (line) {
    setStatusText(`${currentPlayer === PLAYER_X ? 'X' : 'O'} wins!`);
    highlightWinningLine(line);
    gameOver = true;
    return;
  }
  if (moveCount === BOARD_SIZE * BOARD_SIZE * BOARD_SIZE) {
    setStatusText('Draw');
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  setStatusText(`Turn: ${currentPlayer === PLAYER_X ? 'X' : 'O'}`);
}

window.addEventListener('mousemove', onPointerMove);
window.addEventListener('click', onClick);

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

// Winning lines precomputation
const winningLines = [];

function addLine(points) {
  winningLines.push(points);
}

// Lines along X, Y, Z
for (let z = 0; z < 3; z += 1) {
  for (let y = 0; y < 3; y += 1) {
    addLine([[0, y, z], [1, y, z], [2, y, z]]);
  }
}
for (let z = 0; z < 3; z += 1) {
  for (let x = 0; x < 3; x += 1) {
    addLine([[x, 0, z], [x, 1, z], [x, 2, z]]);
  }
}
for (let y = 0; y < 3; y += 1) {
  for (let x = 0; x < 3; x += 1) {
    addLine([[x, y, 0], [x, y, 1], [x, y, 2]]);
  }
}

// Plane diagonals (xy for each z)
for (let z = 0; z < 3; z += 1) {
  addLine([[0, 0, z], [1, 1, z], [2, 2, z]]);
  addLine([[2, 0, z], [1, 1, z], [0, 2, z]]);
}
// Plane diagonals (xz for each y)
for (let y = 0; y < 3; y += 1) {
  addLine([[0, y, 0], [1, y, 1], [2, y, 2]]);
  addLine([[2, y, 0], [1, y, 1], [0, y, 2]]);
}
// Plane diagonals (yz for each x)
for (let x = 0; x < 3; x += 1) {
  addLine([[x, 0, 0], [x, 1, 1], [x, 2, 2]]);
  addLine([[x, 2, 0], [x, 1, 1], [x, 0, 2]]);
}

// Space diagonals
addLine([[0, 0, 0], [1, 1, 1], [2, 2, 2]]);
addLine([[2, 0, 0], [1, 1, 1], [0, 2, 2]]);
addLine([[0, 2, 0], [1, 1, 1], [2, 0, 2]]);
addLine([[2, 2, 0], [1, 1, 1], [0, 0, 2]]);

function checkWin() {
  for (const line of winningLines) {
    const [a, b, c] = line;
    const va = getCell(a[0], a[1], a[2]);
    if (va === EMPTY) continue;
    const vb = getCell(b[0], b[1], b[2]);
    const vc = getCell(c[0], c[1], c[2]);
    if (va === vb && vb === vc) {
      return line;
    }
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


