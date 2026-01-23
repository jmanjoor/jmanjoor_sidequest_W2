let floorY3;
let items = [];
let totalScore = 0;
let currentHeld = 0;

let blob3 = {
  x: 80,
  y: 0,
  r: 26,
  points: 48,
  wobble: 12,
  wobbleFreq: 1.2,
  t: 0,
  tSpeed: 0.15,
  vx: 0,
  vy: 0,
  accel: 1.2,
  maxRun: 8.0,
  gravity: 0.65,
  jumpV: -12.0,
  onGround: false,
  frictionAir: 0.99,
  frictionGround: 0.8,
};

let platforms = [];

function setup() {
  createCanvas(640, 360);
  floorY3 = height - 36;

  // 4 FLOATING PLATFORMS + 1 FLOOR
  platforms = [
    { x: 0, y: floorY3, w: width, h: height - floorY3 }, // Floor
    { x: 50, y: floorY3 - 60, w: 110, h: 12 }, // Plat 1
    { x: 210, y: floorY3 - 130, w: 100, h: 12 }, // Plat 2
    { x: 380, y: floorY3 - 200, w: 110, h: 12 }, // Plat 3
    { x: 510, y: floorY3 - 100, w: 90, h: 12 }, // Plat 4
  ];

  spawnItems();
  blob3.y = floorY3 - blob3.r - 1;
}

function spawnItems() {
  // Spreading 3 items across the 4 platforms
  items = [
    { x: 90, y: floorY3 - 85, w: 15, h: 15, stolen: false, stackPos: 0 },
    { x: 250, y: floorY3 - 155, w: 15, h: 15, stolen: false, stackPos: 0 },
    { x: 420, y: floorY3 - 225, w: 15, h: 15, stolen: false, stackPos: 0 },
  ];
}

function draw() {
  background(220, 200, 200);

  // Draw Platforms
  fill(100);
  for (const p of platforms) rect(p.x, p.y, p.w, p.h);

  // --- Reset Logic ---
  if (currentHeld >= 3) {
    currentHeld = 0;
    spawnItems();
  }

  // --- Movement & Input ---
  let move = 0;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) move -= 1;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) move += 1;

  blob3.vx += blob3.accel * move + random(-0.2, 0.2);
  blob3.vx *= blob3.onGround ? blob3.frictionGround : blob3.frictionAir;
  blob3.vx = constrain(blob3.vx, -blob3.maxRun, blob3.maxRun);
  blob3.vy += blob3.gravity;

  // --- Anti-Sticking Collision Logic ---
  // Create a collision box slightly smaller than the visual radius to prevent "snagging"
  let box = {
    x: blob3.x - blob3.r + 2,
    y: blob3.y - blob3.r + 2,
    w: blob3.r * 2 - 4,
    h: blob3.r * 2 - 4,
  };

  // 1. Resolve Horizontal (X)
  box.x += blob3.vx;
  for (const s of platforms) {
    if (overlap(box, s)) {
      if (blob3.vx > 0) box.x = s.x - box.w;
      else if (blob3.vx < 0) box.x = s.x + s.w;
      blob3.vx = 0;
    }
  }
  blob3.x = box.x + box.w / 2; // Sync blob x

  // 2. Resolve Vertical (Y)
  box.y += blob3.vy;
  blob3.onGround = false;
  for (const s of platforms) {
    if (overlap(box, s)) {
      if (blob3.vy > 0) {
        box.y = s.y - box.h;
        blob3.vy = 0;
        blob3.onGround = true;
      } else if (blob3.vy < 0) {
        box.y = s.y + s.h;
        blob3.vy = 0;
      }
    }
  }
  blob3.y = box.y + box.h / 2; // Sync blob y

  // Screen Boundaries
  blob3.x = constrain(blob3.x, blob3.r, width - blob3.r);

  // --- Mischief Logic ---
  for (let item of items) {
    fill(255, 204, 0);
    if (item.stolen) {
      item.x = blob3.x - 7;
      item.y = blob3.y - (blob3.r + 10 + item.stackPos * 12);
    } else {
      if (overlap(box, item)) {
        item.stolen = true;
        item.stackPos = currentHeld;
        currentHeld += 1;
        totalScore += 1;
      }
    }
    rect(item.x, item.y, item.w, item.h);
  }

  // --- Draw Blob ---
  blob3.t += blob3.tSpeed;
  drawBlobCircle(blob3);

  // HUD
  fill(0);
  textSize(18);
  text("TOTAL SCORE: " + totalScore, 20, 30);
  text("HELD: " + currentHeld + " / 3", 20, 55);
}

function overlap(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

function drawBlobCircle(b) {
  fill(50, 150, 255);
  beginShape();
  for (let i = 0; i < b.points; i++) {
    const a = (i / b.points) * TAU;
    const n = noise(
      cos(a) * b.wobbleFreq + 100,
      sin(a) * b.wobbleFreq + 100,
      b.t,
    );
    const r = b.r + map(n, 0, 1, -b.wobble, b.wobble);
    vertex(b.x + cos(a) * r + random(-1, 1), b.y + sin(a) * r + random(-1, 1));
  }
  endShape(CLOSE);
}

function keyPressed() {
  if ((key === " " || keyCode === UP_ARROW || key === "w") && blob3.onGround) {
    blob3.vy = blob3.jumpV;
    blob3.onGround = false;
  }
}
