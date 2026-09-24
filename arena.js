/* global enemies, allyEnlist, allyBody, ALLYBODIES, player, hearts, dead, invuln, camX, camY, WORLD_ZOOM, groundY, gameTime, mission, modeSelect,
   tutorialScreen, tutorial, gameMode, restart, startMission, devWipeEnemies, boss, jwSeeded, leftDown, rightDown, spaceDown, fireDown, pulseDown,
   shockHeld, PHONE_TRIGGER, spawnDrone, spawnSuiDrone, spawnJackBoy, spawnPlatinum, spawnRabbi, spawnLion, spawnDealer2, spawnPopcorn, spawnLabMachine,
   damageEnemy, dmgTag, ctx, canvas, waves, floaters, spawnParticle, endTutorial, enterModeSelect, chooseMode, bullets, frameLocalX, frameLocalY,
   updateHud, updateMissionHud, GAME_VERSION, menuSurfaceLive, setPaused, paused */
/* exported ARENA9, arenaArrive9, startArena9, arenaAddr9, arenaRoundHit9, arenaKill9, arenaEnd9, arenaTick9, arenaDrawUi9, arenaDrawWorld9, arenaTouch9, arenaCamTarget9, arenaCamY9, arenaBlow9, arenaDuel9, arenaDeploy9 */
/* eslint no-unused-vars: ["error", { "vars": "local", "args": "none", "caughtErrors": "none" }] */   // the engine's globals above are written here and read in game.js
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
//  TRAX: ARENA — THE GAME (2026-09-24, his order; see ARENA.md and CLAUDE.md in this house).
//  Two commanders, one street. The player's units are the engine's ALLIES (team 'ally'), the AI's units are its HOSTILES; the
//  engine's own brains fight, the engine's own damage doors bleed. The player's base is the pilot standing invisible at the west
//  end (his hearts are the base); the AI's tower is an inert hostile body at the east end. This file owns the state, the roster and
//  its prices, the deploys, the AI commander (for either side - the balance tool plays it against itself), the income, the clock,
//  the view (whole lane / follow the front / free, pinch and wheel to zoom, drag to look, a minimap), the team colours under every
//  unit, the panel, the strip, the tempers and the result. The engine carries only small hooks gated on ARENA9_ON().
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
const ARENA9_SIM = (typeof globalThis !== 'undefined' && !!globalThis.__SIM__);   // the headless world (harness/env.js): no DOM, no panel, no card
const ARENA9 = {
  on: false, t: 0, result: null, endT: 0, wipe9: false,
  baseX: 400, towerX: 2800, baseHp: 40, towerHp: 90,
  gold: 3000, aiGold: 3000, startGold: 3000, income: 6,   // THE WAR CHEST (v0.1.8, his order 2026-09-24: 'twenty x the starting budget. So we could get a real full scale war going out the gate'): 150 -> 3000 a side
  warChest: 400, burst: 10,   // a commander whose wallet holds more than the chest deploys ten men a look
  tower: null,
  view: 'whole', reach: 4000, zoom: 0.4, freeX: 1600, drag: null, mouse: null, touches: {}, pinchD: 0, chips: [], map: null,
  temper: 'normal',
  ai: { gap: 1.6, warm: 3, t: 0, incomeM: 1, saveFor: null, last: '' },
  hai: { gap: 1.6, t: 0, saveFor: null },   // the human side's commander, awake only in self-play (the balance tool)
  selfplay: false, duel: null,
  kills: { human: 0, ai: 0 }, spent: { human: 0, ai: 0 }, deployed: { human: 0, ai: 0 },
  stats: { human: {}, ai: {} },
  dmg: { blade: 1, ray: 1, round: { drone: 1, rpulse: 1.5, labgem: 3, bmissile: 4 } },
  panel: null, end: null, bound: false, cardsDim: null,
};
const ARENA9_TEMPERS = { easy: { incomeM: 0.8, gap: 2.2 }, normal: { incomeM: 1, gap: 1.6 }, hard: { incomeM: 1.25, gap: 1.1 } };
const ARENA9_ROSTER = [   // cheap to dear; the prices are BALANCE PASS 5's (2026-09-24, tools/arena-balance.js at 450 a side, two duels a pair; the ledger in ARENA.md): price x (1 + strength / 2), rounded to 5
  { k: 'pop',     name: 'POPCORN',  price: 10,  air: true,  spawn: (x) => { spawnPopcorn(x, 90); return enemies[enemies.length - 1]; } },
  { k: 'grudge',  name: 'GRUDGE',   price: 10,  air: true,  spawn: (x) => { spawnSuiDrone(x, 140); return enemies[enemies.length - 1]; } },
  { k: 'drone',   name: 'DRONE',    price: 45,  air: true,  spawn: (x) => { spawnDrone(x, 120, x - 260, x + 260, true); return enemies[enemies.length - 1]; } },
  { k: 'plat',    name: 'PLATINUM', price: 60,  air: true,  spawn: (x) => { spawnPlatinum(x, 110); return enemies[enemies.length - 1]; } },
  { k: 'jack',    name: 'JACKBOY',  price: 80,  air: false, spawn: (x) => { spawnJackBoy(x); return enemies[enemies.length - 1]; } },
  { k: 'dealer',  name: 'DEALER',   price: 80,  air: false, spawn: (x) => { spawnDealer2(x); return enemies[enemies.length - 1]; } },
  { k: 'lion',    name: 'LION',     price: 90,  air: true,  holds: true, spawn: (x) => { spawnLion(x, 220); return enemies[enemies.length - 1]; } },
  { k: 'machine', name: 'MACHINE',  price: 145, air: true,  holds: true, spawn: (x) => { spawnLabMachine(x, 200, 40); return enemies[enemies.length - 1]; } },   // 40 is the deploy desk's own base hp for a machine; the size roll scales it
  { k: 'rabbi',   name: 'RABBI',    price: 310, air: false, spawn: (x) => { spawnRabbi(x, 0); return enemies[enemies.length - 1]; } },
];
const ARENA9_ADDR = { x: 0, y: 0 };   // one scratch answer per call (the engine's BODY_ADDR habit)
const ARENA9_ZOOM = { MIN: 0.25, MAX: 1.2, FOLLOW: 0.85 };

function arenaArrive9() {   // the front door's tap: no film, no title, no slab - the lane
  tutorial.active = false; tutorialScreen = false;
  restart();
  enterModeSelect();
  chooseMode('arena');
}
function arenaFitZoom9() {   // the zoom that shows the whole lane, bases included
  const W = window.innerWidth;
  return Math.max(ARENA9_ZOOM.MIN, Math.min(ARENA9_ZOOM.FOLLOW, (W - 60) / (ARENA9.towerX - ARENA9.baseX + 640)));
}
function arenaView9(v) {   // the three views: the whole lane, the front, or where the finger left it
  ARENA9.view = v;
  if (v === 'whole') ARENA9.zoom = arenaFitZoom9();
  else if (v === 'follow') ARENA9.zoom = ARENA9_ZOOM.FOLLOW;
  else if (v === 'free' && ARENA9.freeX === null) ARENA9.freeX = camX;
}
function arenaTemper9(t) { const T = ARENA9_TEMPERS[t]; if (!T) return; ARENA9.temper = t; ARENA9.ai.incomeM = T.incomeM; ARENA9.ai.gap = T.gap; }
function arenaStatsReset9() { ARENA9.stats = { human: {}, ai: {} }; for (const r of ARENA9_ROSTER) { ARENA9.stats.human[r.k] = { n: 0, spent: 0, dmg: 0, kills: 0, deaths: 0 }; ARENA9.stats.ai[r.k] = { n: 0, spent: 0, dmg: 0, kills: 0, deaths: 0 }; } }
function startArena9() {
  if (mission.state === 'title') { modeSelect = false; startMission(); }
  devWipeEnemies();
  boss.dead = true; boss.engaged = false;
  if (tutorial.active) endTutorial(false);
  tutorialScreen = false; modeSelect = false;
  gameMode = 'arena'; ARENA9.on = true; jwSeeded = true; waves.n = 1;
  ARENA9.t = 0; ARENA9.result = null; ARENA9.endT = 0; ARENA9.wipe9 = false; ARENA9.gold = ARENA9.startGold; ARENA9.aiGold = ARENA9.startGold; ARENA9.duel = null;
  ARENA9.kills = { human: 0, ai: 0 }; ARENA9.spent = { human: 0, ai: 0 }; ARENA9.deployed = { human: 0, ai: 0 }; arenaStatsReset9();
  arenaTemper9(ARENA9.temper);
  ARENA9.ai.t = -ARENA9.ai.warm; ARENA9.ai.saveFor = null; ARENA9.ai.last = ''; ARENA9.hai.t = -ARENA9.ai.warm; ARENA9.hai.saveFor = null; ARENA9.hai.gap = ARENA9.ai.gap;
  ARENA9.drag = null; ARENA9.mouse = null; ARENA9.touches = {}; ARENA9.pinchD = 0;
  hearts = ARENA9.baseHp; dead = false; invuln = 0;
  player.x = ARENA9.baseX; player.y = groundY(); player.vx = 0; player.vy = 0; player.grounded = true; player.facing = 1;
  bullets.length = 0;
  arenaTower9();
  camY = 0; camX = (ARENA9.baseX + ARENA9.towerX) / 2; ARENA9.freeX = camX;
  arenaView9('whole'); WORLD_ZOOM = ARENA9.zoom;
  if (!ARENA9_SIM) {
    const hintEl = document.getElementById('hint'); if (hintEl) hintEl.style.display = 'none';
    arenaPanel9(); arenaBind9();
    if (ARENA9.end) ARENA9.end.style.display = 'none';
  }
  floaters.push({ lane: 'ticker', pr: 2, x: camX, y: groundY() - 360, text: 'THE ARENA — DEPLOY', age: 0 });
  updateHud(); updateMissionHud();
}
function arenaTower9() {   // the AI's base: an inert hostile body (a rival-kind body in 'walk' is inert, the tutorial dummy's own trick)
  const e = { kind: 'rival', x: ARENA9.towerX, dy: 0, hp: ARENA9.towerHp, maxHp: ARENA9.towerHp, state: 'walk', anim: 'idle', animTime: 0, t: 1, dir: -1, fade: 1, tower9: true, summoned: true };
  enemies.push(e); ARENA9.tower = e; return e;
}
function arenaRoster9(k) { for (const r of ARENA9_ROSTER) if (r.k === k) return r; return null; }
function arenaDeploy9(side, k, free) {
  const r = arenaRoster9(k); if (!r || ARENA9.result || !ARENA9.on) return false;
  const wallet = side === 'human' ? 'gold' : 'aiGold';
  if (!free && ARENA9[wallet] < r.price) return false;
  const x = side === 'human' ? ARENA9.baseX + 140 + Math.random() * 260 : ARENA9.towerX - 140 - Math.random() * 260;   // a 260-px zone: ten men a look land as a line, not a stack
  const n0 = enemies.length;
  const b = r.spawn(x);
  if (!b || enemies.length === n0) return false;
  b.__arenaK = k; b.__arenaSide = side; b.summoned = true; b.__hp0 = b.hp;
  b.x0 = ARENA9.baseX + 80; b.x1 = ARENA9.towerX - 80; b.hunter = true;   // THE MARCH: no beat, no roam - the lane is the ground and the other base is the destination
  if (side === 'human') allyEnlist(b);
  else { for (const f of ['elite', 'paragon', 'heavy', 'super']) if (b[f]) delete b[f]; }   // the same fence the ally door has: no gilded bodies in the arena
  if (!free) { ARENA9[wallet] -= r.price; ARENA9.spent[side] += r.price; }
  ARENA9.deployed[side]++; const st = ARENA9.stats[side][k]; if (st) { st.n++; st.spent += r.price; }
  if (side === 'ai') ARENA9.ai.last = r.name;   // the ticker speaks once a look, in arenaBurst9
  return true;
}
function arenaCount9(side) { const c = {}; for (const z of enemies) if (z.__arenaSide === side && z.state !== 'die' && z.hp > 0) c[z.__arenaK] = (c[z.__arenaK] || 0) + 1; return c; }
function arenaAi9(side) {   // the commander: counters what it sees, buys by weight of price, saves one time in three - for either side
  side = side || 'ai';
  const other = side === 'ai' ? 'human' : 'ai', wallet = side === 'ai' ? 'aiGold' : 'gold', brain = side === 'ai' ? ARENA9.ai : ARENA9.hai;
  let cheapest = Infinity; for (const r of ARENA9_ROSTER) if (r.price < cheapest) cheapest = r.price;
  if (ARENA9[wallet] < cheapest) return;
  const mine = arenaCount9(side), theirs = arenaCount9(other);
  let marchers = 0; for (const r of ARENA9_ROSTER) if (!r.holds) marchers += mine[r.k] || 0;   // THE OPENING: a side with no marcher on the field buys one - a unit that holds its ground, bought first, sits at its own base and nothing moves
  let air = 0, ground = 0; for (const r of ARENA9_ROSTER) { if (r.air) air += theirs[r.k] || 0; else ground += theirs[r.k] || 0; }
  let pick = null;
  if (brain.saveFor) {
    const rs = arenaRoster9(brain.saveFor);
    if (rs && ARENA9[wallet] >= rs.price) { pick = rs.k; brain.saveFor = null; } else return;
  } else if (air >= 3 && (mine.rabbi || 0) < 2) pick = ARENA9[wallet] >= arenaRoster9('rabbi').price ? 'rabbi' : (ARENA9[wallet] >= arenaRoster9('plat').price ? 'plat' : null);   // the counters read the roster's prices, never a literal
  else if (ground >= 3 && (mine.lion || 0) < 1) pick = ARENA9[wallet] >= arenaRoster9('lion').price ? 'lion' : (ARENA9[wallet] >= arenaRoster9('grudge').price ? 'grudge' : null);
  else if (marchers >= 2 && Math.random() < 0.33 && ARENA9[wallet] < 150) { /* a save is a quiet twenty seconds: the side saves only with two marchers already on the street */ brain.saveFor = Math.random() < 0.5 ? 'lion' : (Math.random() < 0.5 ? 'rabbi' : 'machine'); return; }
  if (!pick) {
    const aff = ARENA9_ROSTER.filter((q) => q.price <= ARENA9[wallet] && (marchers > 0 || !q.holds)); if (!aff.length) return;
    const w = aff.map((q) => 60 / q.price); let s = 0; for (const v of w) s += v; let roll = Math.random() * s;
    for (let i = 0; i < aff.length; i++) { roll -= w[i]; if (roll <= 0) { pick = aff[i].k; break; } }
    if (!pick) pick = aff[aff.length - 1].k;
  }
  return arenaDeploy9(side, pick);
}
function arenaBurst9(side) {   // THE WAR CHEST (v0.1.8): a full chest is spent ten men a look, so twenty times the gold is an army out of the gate and not a queue; one line on the ticker per look
  const wallet = side === 'ai' ? 'aiGold' : 'gold';
  const n = ARENA9[wallet] > ARENA9.warChest ? ARENA9.burst : 1;
  let sent = 0; for (let k = 0; k < n; k++) { if (!arenaAi9(side)) break; sent++; }
  if (sent && side === 'ai' && !ARENA9.selfplay) floaters.push({ lane: 'ticker', pr: 2, x: ARENA9.towerX - 260, y: groundY() - 300, text: sent === 1 ? 'KING SENDS A ' + ARENA9.ai.last : 'KING SENDS ' + sent + ' MEN', age: 0 });
  return sent;
}
function arenaAddr9(e, px, py) {   // what "the pilot's address" means to this body: a hostile hunts the base; an ally hunts its foe, or the tower
  const a = ARENA9_ADDR;
  if (!allyBody(e)) {   // THE KING'S SEAT (v0.1.4): the nearest of the player's units anywhere on the lane is the address (the mirror of allyFoe's lane-long leash); with none standing, the base - at 900 px of reach (v0.1.4) the King's men spread along their march while the player's units ganged up, and self-play went 6-0 to the player's seat
    let best = null, bd = ARENA9.reach * ARENA9.reach;
    for (const z of ALLYBODIES) { if (z.state === 'die' || z.hp <= 0) continue; const dx = z.x - e.x, dy = (z.dy || 0) - (e.dy || 0), d2 = dx * dx + dy * dy; if (d2 < bd) { bd = d2; best = z; } }
    e.__foe9 = best;
    if (!best) { a.x = px; a.y = py; return a; }
    a.x = best.x; a.y = groundY() - (best.dy || 0) - 40; return a;
  }
  const f = e.__foe, tw = ARENA9.tower;
  const tgt = (f && f.hp > 0 && f.state !== 'die' && enemies.indexOf(f) >= 0) ? f : ((tw && tw.hp > 0 && tw.state !== 'die') ? tw : null);
  if (!tgt) { a.x = ARENA9.towerX; a.y = groundY() - 40; return a; }
  a.x = tgt.x; a.y = groundY() - (tgt.dy || 0) - 40; return a;
}
function arenaBox9(z, bx, by) {   // a round's landing box on a body: its centre 45 up from its feet
  const cy = groundY() - (z.dy || 0) - 45;
  const hw = z.lion ? 70 : z.tower9 ? 60 : z.lab ? 60 : 34, hh = z.lion ? 70 : z.tower9 ? 110 : z.lab ? 60 : 62;
  return Math.abs(z.x - bx) < hw && Math.abs(cy - by) < hh;
}
function arenaRoundHit9(b) {   // a round lands on a body of the OTHER side; the pilot test and the payroll test stay the engine's
  const src = b.src, human = !!(src && allyBody(src));
  const dmg = ARENA9.dmg.round[b.kind] || (b.plat ? 2 : b.pop ? 0.5 : 1);
  if (human) { for (const z of enemies) { if (z === src || allyBody(z) || z.state === 'die' || z.hp <= 0) continue; if (arenaBox9(z, b.x, b.y)) { arenaBlow9(src, z, dmg); spawnParticle(b.x, b.y, { vy: 0, spread: 260, life: 0.25, r: 3, color: '#ffd76a' }); return true; } } }
  else { for (const z of ALLYBODIES) { if (z === src || z.state === 'die' || z.hp <= 0) continue; if (arenaBox9(z, b.x, b.y)) { arenaBlow9(src, z, dmg); spawnParticle(b.x, b.y, { vy: 0, spread: 260, life: 0.25, r: 3, color: '#ff9f9f' }); return true; } } }
  return false;
}
function arenaBlow9(from, z, dmg) {   // the arena's one damage door: the blow is booked to the unit that struck, then the engine's door bleeds it
  z.__hitT9 = ARENA9.t;
  if (from && from.__arenaSide && from.__arenaK) { const st = ARENA9.stats[from.__arenaSide][from.__arenaK]; if (st) st.dmg += Number.isFinite(z.hp) ? Math.min(dmg, Math.max(0, z.hp)) : dmg; }
  z.__lastHit9 = from || null;
  dmgTag = 'arena'; damageEnemy(z, dmg); dmgTag = '';
}
function arenaKill9(e) {   // the bounty: 30% of the dead unit's price to the side that killed it; the tower's fall is the win
  if (e.tower9) { arenaEnd9('won'); return; }
  const r = e.__arenaK ? arenaRoster9(e.__arenaK) : null; if (!r) return;
  const victim = e.__arenaSide, killerSide = victim === 'human' ? 'ai' : 'human';
  const sv = ARENA9.stats[victim] && ARENA9.stats[victim][e.__arenaK]; if (sv) sv.deaths++;
  const k9 = e.__lastHit9; if (k9 && k9.__arenaSide === killerSide && ARENA9.stats[killerSide][k9.__arenaK]) ARENA9.stats[killerSide][k9.__arenaK].kills++;
  const bounty = r.price * 0.3;
  if (victim === 'human') { ARENA9.kills.ai++; ARENA9.aiGold += bounty; } else { ARENA9.kills.human++; ARENA9.gold += bounty; }
  if (!ARENA9_SIM) floaters.push({ lane: 'ticker', pr: 1, x: e.x, y: groundY() - (e.dy || 0) - 90, text: '+' + Math.round(bounty), age: 0 });
}
function arenaEnd9(res) {
  if (ARENA9.result || !ARENA9.on) return;
  ARENA9.result = res; ARENA9.endT = ARENA9.t;
  dead = true;   // the base takes no more blows; the engine's own death screens never open (gameOver returned to us)
  ARENA9.wipe9 = true;   // the field is cleared on the NEXT tick - this call can come from inside the body loop (a blade on the base, a round on the tower) and a wipe there leaves the loop reading a hole
  if (!ARENA9_SIM) arenaEndCard9();
}
function arenaTick9(dt) {   // the commanders' clock, run each frame beside the engine's update
  ARENA9.t += dt;
  player.x = ARENA9.baseX; player.vx = 0; player.facing = 1; if (player.y > groundY()) player.y = groundY();   // the base does not walk, whatever hits it
  leftDown = false; rightDown = false; spaceDown = false; fireDown = false; pulseDown = false; shockHeld = false; PHONE_TRIGGER.on = false;   // no pilot to steer
  if (invuln > 0.4) invuln = 0.4;   // the base has short i-frames: many bodies wear it down, but not four hits a second
  WORLD_ZOOM += (ARENA9.zoom - WORLD_ZOOM) * Math.min(1, dt * 6);   // the lens eases to the view's zoom
  if (ARENA9.wipe9) { ARENA9.wipe9 = false; devWipeEnemies(); ARENA9.tower = null; bullets.length = 0; }   // the match is over: the field clears between frames, never mid-loop
  for (const z of enemies) { if (!z.__arenaSide || z.state === 'die') continue; if (z.x < ARENA9.baseX - 60) z.x = ARENA9.baseX - 60; else if (z.x > ARENA9.towerX + 60) z.x = ARENA9.towerX + 60; }   // THE LANE HOLDS (v0.1.7): a machine keeping its distance backed off past its own tower to x 3200; nothing leaves the street the WHOLE view shows
  if (ARENA9.result) return;
  if (ARENA9.lastHearts9 === undefined) ARENA9.lastHearts9 = hearts;
  if (hearts < ARENA9.lastHearts9) { ARENA9.baseHitT9 = ARENA9.t; floaters.push({ lane: 'combat', pr: 2, x: ARENA9.baseX, y: groundY() - 300, text: 'BASE ' + (hearts - ARENA9.lastHearts9) + ' ♥', age: 0, big: true }); }   // THE HIT READS (v0.1.7): a heart lost is said at the base and the plaque flashes
  ARENA9.lastHearts9 = hearts;
  if (ARENA9.duel) { arenaDuelTick9(); return; }   // a duel has no income and no commanders
  ARENA9.gold += ARENA9.income * dt; ARENA9.aiGold += ARENA9.income * ARENA9.ai.incomeM * dt;
  ARENA9.ai.t += dt; if (ARENA9.ai.t >= ARENA9.ai.gap) { ARENA9.ai.t = 0; arenaBurst9('ai'); }
  if (ARENA9.selfplay) { ARENA9.hai.t += dt; if (ARENA9.hai.t >= ARENA9.hai.gap) { ARENA9.hai.t = 0; arenaBurst9('human'); } }
  if (ARENA9.t >= 360) { const th = ARENA9.tower ? ARENA9.tower.hp / ARENA9.towerHp : 0; arenaEnd9(hearts / ARENA9.baseHp >= th ? 'won' : 'lost'); return; }
  if (!ARENA9_SIM) arenaPanelSync9();
}
// ---- THE DUEL (the balance tool's room): a budget of one unit against a budget of another, no towers in reach, no income - who is left standing
function arenaDuel9(kx, nx, ky, ny) {
  startArena9();
  if (ARENA9.tower) { ARENA9.tower.hp = 1e9; ARENA9.tower.maxHp = 1e9; }   // the tower is not the question here
  hearts = 1e6;
  ARENA9.duel = { kx, ky, nx, ny, t0: ARENA9.t, done: null };
  for (let i = 0; i < nx; i++) arenaDeploy9('human', kx, true);
  for (let i = 0; i < ny; i++) arenaDeploy9('ai', ky, true);
  for (const z of enemies) { if (z.__arenaSide === 'human') z.x = ARENA9.baseX + 700 + Math.random() * 120; else if (z.__arenaSide === 'ai') z.x = ARENA9.baseX + 1100 + Math.random() * 120; }   // 400 px apart: they meet at once
  return ARENA9.duel;
}
function arenaDuelTick9() {
  const d = ARENA9.duel; if (!d || d.done) return;
  let hx = 0, hy = 0, ax = 0, ay = 0;
  for (const z of enemies) { if (z.state === 'die' || z.hp <= 0 || !z.__arenaSide) continue; const share = Math.min(1, Math.max(0, z.hp) / (z.__hp0 || z.hp || 1)); if (z.__arenaSide === 'human') { hx++; ax += share; } else { hy++; ay += share; } }
  const dt9 = ARENA9.t - d.t0;
  if (hx === 0 || hy === 0 || dt9 > 90) {
    const fx = d.nx ? ax / d.nx : 0, fy = d.ny ? ay / d.ny : 0;   // the survivors' hit points as a share of what was fielded
    d.done = { winner: hx > hy ? 'x' : hy > hx ? 'y' : (fx > fy ? 'x' : fy > fx ? 'y' : 'draw'), left: { x: hx, y: hy }, frac: { x: +fx.toFixed(3), y: +fy.toFixed(3) }, t: +dt9.toFixed(1), timeout: dt9 > 90 };
  }
}
function arenaFront9() {   // the point between the player's farthest unit and the AI's nearest
  let maxA = -Infinity, minH = Infinity;
  for (const z of enemies) { if (z.state === 'die' || z.tower9 || z.hp <= 0) continue; if (allyBody(z)) { if (z.x > maxA) maxA = z.x; } else if (z.x < minH) minH = z.x; }
  let front = (ARENA9.baseX + ARENA9.towerX) / 2;
  if (maxA > -Infinity && minH < Infinity) front = (maxA + minH) / 2; else if (maxA > -Infinity) front = maxA + 200; else if (minH < Infinity) front = minH - 200;
  return Math.max(ARENA9.baseX + 300, Math.min(ARENA9.towerX - 300, front));
}
function arenaCamTarget9() {   // the eye: the whole lane's middle, the front, or where the finger left it
  if (ARENA9.view === 'whole') return (ARENA9.baseX + ARENA9.towerX) / 2;
  if (ARENA9.view === 'follow') return arenaFront9();
  return Math.max(ARENA9.baseX - 300, Math.min(ARENA9.towerX + 300, ARENA9.freeX));
}
function arenaCamY9() {   // THE GROUND LIFTED (v0.1.3): the panel covers the bottom of the glass, so the street is raised clear of it - a constant lift in frame px, whatever the zoom
  let panel = 120;
  if (ARENA9.panel && !ARENA9_SIM) { const pr = ARENA9.panel.getBoundingClientRect(), cr = canvas.getBoundingClientRect(); panel = pr.height * (window.innerHeight / (cr.height || 1)); }
  return (panel + 40) / WORLD_ZOOM;
}
function arenaZoomBy9(m) { arenaView9('free'); if (ARENA9.freeX === null || ARENA9.freeX === undefined) ARENA9.freeX = camX; ARENA9.zoom = Math.max(ARENA9_ZOOM.MIN, Math.min(ARENA9_ZOOM.MAX, ARENA9.zoom * m)); }
function arenaPanBy9(dxFrame) { if (ARENA9.view !== 'free') { ARENA9.view = 'free'; ARENA9.freeX = camX; } ARENA9.freeX -= dxFrame / WORLD_ZOOM; }
function arenaHit9(fx, fy) {   // a point on the glass in frame units: the pause corner, a chip, the minimap - true when it took the point
  const W = window.innerWidth;
  if (fx > W - 72 && fy < 72 && !paused && !dead) { setPaused(true); return true; }
  for (const c of ARENA9.chips) if (fx >= c.x && fx <= c.x + c.w && fy >= c.y && fy <= c.y + c.h) { c.fn(); return true; }
  const m = ARENA9.map;
  if (m && fx >= m.x - 6 && fx <= m.x + m.w + 6 && fy >= m.y - 8 && fy <= m.y + m.h + 8) {
    const wx = ARENA9.baseX + (fx - m.x) / m.w * (ARENA9.towerX - ARENA9.baseX);
    ARENA9.view = 'free'; ARENA9.freeX = wx; if (ARENA9.zoom < 0.6) ARENA9.zoom = ARENA9_ZOOM.FOLLOW;
    return true;
  }
  return false;
}
function arenaTouch9(e, phase) {   // fingers on the glass: one drags the street, two pinch the zoom, a tap takes a chip or the minimap
  if (e.cancelable) e.preventDefault();
  const T = ARENA9.touches;
  for (const t of Array.from(e.changedTouches || [])) {
    const fx = frameLocalX(t.clientX), fy = frameLocalY(t.clientY);
    if (phase === 'start') { if (!arenaHit9(fx, fy)) T[t.identifier] = { x: fx, y: fy, x0: fx, y0: fy }; }
    else if (phase === 'move') { if (T[t.identifier]) { T[t.identifier].x = fx; T[t.identifier].y = fy; } }
    else delete T[t.identifier];
  }
  const ids = Object.keys(T);
  if (phase === 'move') {
    if (ids.length >= 2) {   // the pinch
      const a = T[ids[0]], b = T[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (ARENA9.pinchD > 0 && d > 0) arenaZoomBy9(d / ARENA9.pinchD);
      ARENA9.pinchD = d;
    } else if (ids.length === 1) {
      const a = T[ids[0]]; if (a.px !== undefined) arenaPanBy9(a.x - a.px); a.px = a.x;
      ARENA9.pinchD = 0;
    }
  } else if (phase === 'start' && ids.length === 1) { const a = T[ids[0]]; a.px = a.x; ARENA9.pinchD = 0; }
  else if (ids.length < 2) ARENA9.pinchD = 0;
}
function arenaBind9() {   // once: the mouse drags the street and the wheel zooms it (ahead of the engine's own doors), the digits deploy, the arrows look
  if (ARENA9.bound) return; ARENA9.bound = true;
  const overDom = (e) => !!(e.target && e.target.closest && (e.target.closest('#arenapanel') || e.target.closest('#arenaend')));
  window.addEventListener('mousedown', (e) => {
    if (!ARENA9.on || overDom(e) || menuSurfaceLive()) return;   // a live pause face keeps the engine's own clicks
    e.stopImmediatePropagation(); e.preventDefault();
    const fx = frameLocalX(e.clientX), fy = frameLocalY(e.clientY);
    if (!arenaHit9(fx, fy)) ARENA9.mouse = { x: fx };
  }, true);
  window.addEventListener('mousemove', (e) => { if (!ARENA9.on || !ARENA9.mouse) return; const fx = frameLocalX(e.clientX); arenaPanBy9(fx - ARENA9.mouse.x); ARENA9.mouse.x = fx; }, true);
  window.addEventListener('mouseup', () => { ARENA9.mouse = null; }, true);
  window.addEventListener('wheel', (e) => { if (!ARENA9.on || overDom(e) || menuSurfaceLive()) return; e.preventDefault(); e.stopImmediatePropagation(); arenaZoomBy9(e.deltaY < 0 ? 1.15 : 1 / 1.15); }, { capture: true, passive: false });
  window.addEventListener('keydown', (e) => {
    if (!ARENA9.on || ARENA9.result) return;
    const d = /^Digit([1-9])$/.exec(e.code || '') || /^Numpad([1-9])$/.exec(e.code || '');
    if (d) { const r = ARENA9_ROSTER[+d[1] - 1]; if (r) arenaDeploy9('human', r.k); e.preventDefault(); return; }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') { arenaPanBy9(e.code === 'ArrowLeft' ? 220 : -220); e.preventDefault(); }
    else if (e.code === 'Minus' || e.code === 'NumpadSubtract') { arenaZoomBy9(1 / 1.25); e.preventDefault(); }
    else if (e.code === 'Equal' || e.code === 'NumpadAdd') { arenaZoomBy9(1.25); e.preventDefault(); }
    else if (e.code === 'KeyV') { arenaView9(ARENA9.view === 'whole' ? 'follow' : 'whole'); e.preventDefault(); }
  }, true);
}
function arenaCardTap9(b, k) { if (!arenaDeploy9('human', k)) return false; b.style.background = 'rgba(110,90,34,0.9)'; setTimeout(() => { b.style.background = 'rgba(20,22,30,0.9)'; }, 120); return true; }
function arenaPourStop9() { if (ARENA9.pour9) { clearInterval(ARENA9.pour9); ARENA9.pour9 = null; } }
function arenaPanel9() {   // the nine cards: a tap, a click or a digit deploys
  let p = document.getElementById('arenapanel');
  if (!p) {
    p = document.createElement('div'); p.id = 'arenapanel';
    p.style.cssText = 'position:fixed;left:50%;bottom:8px;transform:translateX(-50%);display:flex;gap:5px;z-index:45;padding:5px;background:rgba(6,8,14,0.6);border:1px solid #6e5a22;border-radius:8px;max-width:calc(100vw - 12px);touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;font-family:ui-monospace,Menlo,Consolas,monospace';
    ARENA9_ROSTER.forEach((r, i) => {
      const b = document.createElement('div'); b.className = 'arenacard'; b.dataset.k = r.k;
      b.style.cssText = 'min-width:64px;padding:5px 6px 4px;border:1px solid #6e5a22;border-radius:6px;background:rgba(20,22,30,0.9);color:#f2f2f2;text-align:center;cursor:pointer;touch-action:none;transition:opacity .15s';
      b.innerHTML = '<div style="font:800 9px ui-monospace,Menlo,monospace;letter-spacing:.1em;color:#ffd76a">' + r.name + '</div><div style="font:800 16px ui-monospace,Menlo,monospace;color:#ffce54;margin-top:2px">' + r.price + '</div><div style="font:600 9px ui-monospace,Menlo,monospace;color:#7f8ba3;margin-top:1px">' + (i + 1) + '</div>';
      b.addEventListener('pointerdown', (ev) => { ev.preventDefault(); ev.stopPropagation(); arenaCardTap9(b, r.k); arenaPourStop9(); ARENA9.pour9 = setInterval(() => { if (!arenaCardTap9(b, r.k)) arenaPourStop9(); }, 140); }, { passive: false });   // THE POUR (v0.1.8): a tap is one man, a hold is a man every 140 ms - a chest of 3000 is spent by holding, not by sixty taps
      b.addEventListener('pointerup', arenaPourStop9); b.addEventListener('pointercancel', arenaPourStop9); b.addEventListener('pointerleave', arenaPourStop9);
      b.addEventListener('touchstart', (ev) => { if (ev.cancelable) ev.preventDefault(); ev.stopPropagation(); }, { passive: false });
      p.appendChild(b);
    });
    document.body.appendChild(p); ARENA9.panel = p;
  }
  p.style.display = 'flex'; ARENA9.cardsDim = null;
}
function arenaPanelSync9() {   // a card the player cannot afford is dimmed; written only when it changes
  if (!ARENA9.panel) return;
  let key = '';
  for (const r of ARENA9_ROSTER) key += ARENA9.gold >= r.price ? '1' : '0';
  if (key === ARENA9.cardsDim) return; ARENA9.cardsDim = key;
  const cards = ARENA9.panel.children;
  for (let i = 0; i < cards.length; i++) cards[i].style.opacity = key[i] === '1' ? '1' : '0.38';
}
function arenaEndCard9() {
  let d = ARENA9.end;
  if (!d) {
    d = document.createElement('div'); d.id = 'arenaend';
    d.style.cssText = 'position:fixed;inset:0;z-index:70;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:rgba(4,6,14,0.82);color:#fff;font-family:ui-monospace,Menlo,Consolas,monospace;letter-spacing:.12em;-webkit-user-select:none;user-select:none';
    d.innerHTML = '<div id="arenaendword" style="font:800 40px ui-monospace,Menlo,monospace;color:#ffce54;letter-spacing:.2em"></div><div id="arenaendsub" style="margin-top:12px;font:600 15px/1.8 ui-monospace,Menlo,monospace;color:rgba(255,255,255,0.85)"></div><div id="arenaagain" style="margin-top:26px;padding:14px 34px;border:2px solid #ffce54;border-radius:6px;color:#ffce54;font:800 18px ui-monospace,Menlo,monospace;letter-spacing:.18em;cursor:pointer;touch-action:none">PLAY AGAIN</div>';
    document.body.appendChild(d); ARENA9.end = d;
    const again = d.querySelector('#arenaagain');
    again.addEventListener('pointerdown', (ev) => { ev.preventDefault(); ev.stopPropagation(); arenaRestart9(); }, { passive: false });
    again.addEventListener('touchstart', (ev) => { if (ev.cancelable) ev.preventDefault(); ev.stopPropagation(); }, { passive: false });
  }
  const won = ARENA9.result === 'won';
  const m = Math.floor(ARENA9.endT / 60), s = String(Math.floor(ARENA9.endT % 60)).padStart(2, '0');
  d.querySelector('#arenaendword').textContent = won ? 'THE TOWER FELL' : 'THE BASE FELL';
  d.querySelector('#arenaendsub').innerHTML = (won ? 'YOU TOOK THE BLOCK' : 'THE BLOCK TOOK YOU') + '<br>TIME ' + m + ':' + s + ' &nbsp;·&nbsp; KILLS ' + ARENA9.kills.human + ' – ' + ARENA9.kills.ai + ' &nbsp;·&nbsp; DEPLOYED ' + ARENA9.deployed.human + ' – ' + ARENA9.deployed.ai + ' &nbsp;·&nbsp; SPENT ' + Math.round(ARENA9.spent.human) + ' – ' + Math.round(ARENA9.spent.ai) + '<br>' + ARENA9.temper.toUpperCase();
  d.style.display = 'flex';
}
function arenaRestart9() { if (ARENA9.end) ARENA9.end.style.display = 'none'; ARENA9.on = false; restart(); startArena9(); }
function arenaDrawWorld9() {   // the two bases and THE COLOURS: a chevron and a life bar under every unit, gold for yours and red for the AI's, sized to the glass whatever the zoom
  const gy = groundY(), k = 1 / Math.max(0.2, WORLD_ZOOM);
  arenaTowerGlyph9(ARENA9.baseX, gy, '#ffce54', '#2a2416', 'TRAX', hearts / ARENA9.baseHp, Math.max(0, hearts) + ' ♥', ARENA9.t - (ARENA9.baseHitT9 === undefined ? -9 : ARENA9.baseHitT9));
  const tw = ARENA9.tower; if (tw && tw.state !== 'die') arenaTowerGlyph9(ARENA9.towerX, gy, '#ff6b6b', '#2a1616', 'KING', tw.hp / ARENA9.towerHp, Math.max(0, Math.ceil(tw.hp)) + ' HP', ARENA9.t - (tw.__hitT9 === undefined ? -9 : tw.__hitT9));
  ctx.save();
  for (const z of enemies) {
    if (!z.__arenaSide || z.state === 'die' || z.hp <= 0) continue;
    const gold = z.__arenaSide === 'human', col = gold ? '#ffce54' : '#ff6b6b';
    const fy = gy - (z.dy || 0) + 8 * k, hw = 7 * k;
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(z.x, fy); ctx.lineTo(z.x - hw, fy + 9 * k); ctx.lineTo(z.x + hw, fy + 9 * k); ctx.closePath(); ctx.fill();
    const bw = 26 * k, bh = 3 * k, frac = Math.max(0, Math.min(1, z.hp / (z.__hp0 || z.hp || 1)));
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(z.x - bw / 2, fy + 12 * k, bw, bh);
    ctx.fillStyle = col; ctx.fillRect(z.x - bw / 2, fy + 12 * k, bw * frac, bh);
  }
  ctx.restore();
}
function arenaTowerGlyph9(x, gy, gold, dark, word, frac, label, hitAge) {
  ctx.save();
  if (hitAge !== undefined && hitAge >= 0 && hitAge < 0.35) {   // THE HIT READS (v0.1.7): a struck plaque flashes white for a third of a second and a ring leaves it
    const a = 1 - hitAge / 0.35;
    ctx.fillStyle = 'rgba(255,255,255,' + (0.55 * a).toFixed(3) + ')'; ctx.fillRect(x - 52, gy - 262, 104, 262);
    ctx.strokeStyle = 'rgba(255,120,120,' + (0.8 * a).toFixed(3) + ')'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, gy - 120, 60 + (1 - a) * 90, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.fillStyle = dark; ctx.fillRect(x - 46, gy - 230, 92, 230);
  ctx.fillStyle = gold; ctx.fillRect(x - 52, gy - 244, 104, 14); ctx.fillRect(x - 30, gy - 262, 60, 18);
  ctx.strokeStyle = gold; ctx.lineWidth = 2; ctx.strokeRect(x - 46, gy - 230, 92, 230);
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) ctx.fillRect(x - 32 + c * 36, gy - 210 + r * 40, 26, 22);
  ctx.fillStyle = gold; ctx.font = "800 22px 'Courier New', monospace"; ctx.textAlign = 'center'; ctx.fillText(word, x, gy - 100);
  const bw = 120, bh = 10, by = gy - 288;
  ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(x - bw / 2, by, bw, bh);
  ctx.fillStyle = gold; ctx.fillRect(x - bw / 2, by, bw * Math.max(0, Math.min(1, frac)), bh);
  ctx.fillStyle = '#fff'; ctx.font = "700 14px 'Courier New', monospace"; ctx.fillText(label, x, by - 6);
  ctx.restore();
}
function arenaChip9(x, y, w, h, text, on, fn) {
  ctx.fillStyle = on ? 'rgba(255,206,84,0.22)' : 'rgba(6,8,14,0.7)'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = on ? '#ffce54' : 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.fillStyle = on ? '#ffe9a3' : 'rgba(255,255,255,0.85)'; ctx.font = "700 12px 'Courier New', monospace"; ctx.textAlign = 'center'; ctx.fillText(text, x + w / 2, y + h - 7);
  ARENA9.chips.push({ x, y, w, h, fn });
}
function arenaDrawUi9() {   // the strip, the minimap, the view chips and the temper chips, in screen space after the world
  const W = window.innerWidth;
  ctx.save();
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = 'rgba(6,8,14,0.55)'; ctx.fillRect(0, 0, W, 44);
  ctx.font = "800 16px 'Courier New', monospace";
  ctx.fillStyle = '#ffce54'; ctx.fillText('GOLD ' + Math.floor(ARENA9.gold), 18, 29);
  ctx.fillStyle = '#ffd76a'; ctx.font = "700 13px 'Courier New', monospace"; ctx.fillText('BASE ♥ ' + Math.max(0, hearts) + ' / ' + ARENA9.baseHp, 150, 29);
  const m = Math.floor(ARENA9.t / 60), s = String(Math.floor(ARENA9.t % 60)).padStart(2, '0');
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.font = "800 15px 'Courier New', monospace"; ctx.fillText('THE ARENA  ·  ' + m + ':' + s, W / 2, 29);
  ctx.textAlign = 'right'; ctx.fillStyle = '#ff9f9f'; ctx.font = "700 13px 'Courier New', monospace";
  const tw = ARENA9.tower;
  ctx.fillText('TOWER ' + (tw && tw.state !== 'die' ? Math.max(0, Math.ceil(tw.hp)) : 0) + ' / ' + ARENA9.towerHp + '   KING’S GOLD ' + Math.floor(ARENA9.aiGold) + '   KILLS ' + ARENA9.kills.human + '–' + ARENA9.kills.ai, W - 60, 29);
  // THE MINIMAP: the lane from base to tower, every unit a dot, the view a bracket; a tap looks there
  const mx = 60, my = 52, mw = W - 120, mh = 22;
  ARENA9.map = { x: mx, y: my, w: mw, h: mh };
  ctx.fillStyle = 'rgba(6,8,14,0.72)'; ctx.fillRect(mx - 4, my - 4, mw + 8, mh + 8);
  ctx.fillStyle = 'rgba(255,255,255,0.10)'; ctx.fillRect(mx, my + mh / 2 - 1, mw, 2);
  const toX = (wx) => mx + (wx - ARENA9.baseX) / (ARENA9.towerX - ARENA9.baseX) * mw;
  ctx.fillStyle = '#ffce54'; ctx.fillRect(mx - 3, my, 6, mh);
  ctx.fillStyle = '#ff6b6b'; ctx.fillRect(mx + mw - 3, my, 6, mh);
  for (const z of enemies) {
    if (z.state === 'die' || z.tower9 || z.hp <= 0) continue;
    const zx = Math.max(mx, Math.min(mx + mw, toX(z.x)));
    ctx.fillStyle = allyBody(z) ? '#ffce54' : '#ff6b6b';
    ctx.beginPath(); ctx.arc(zx, my + mh / 2 + ((z.dy || 0) > 60 ? -5 : 4), 3, 0, Math.PI * 2); ctx.fill();
  }
  const half = (W / 2) / WORLD_ZOOM;
  const vx0 = Math.max(mx, Math.min(mx + mw, toX(camX - half))), vx1 = Math.max(mx, Math.min(mx + mw, toX(camX + half)));
  ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1; ctx.strokeRect(vx0 + 0.5, my + 0.5, Math.max(4, vx1 - vx0) - 1, mh - 1);
  // THE VIEW CHIPS and THE TEMPERS
  ARENA9.chips.length = 0;
  let cx = 60; const cy = 84;
  arenaChip9(cx, cy, 78, 24, 'WHOLE', ARENA9.view === 'whole', () => arenaView9('whole')); cx += 84;
  arenaChip9(cx, cy, 78, 24, 'FOLLOW', ARENA9.view === 'follow', () => arenaView9('follow')); cx += 84;
  arenaChip9(cx, cy, 40, 24, '−', false, () => arenaZoomBy9(1 / 1.25)); cx += 46;
  arenaChip9(cx, cy, 40, 24, '+', false, () => arenaZoomBy9(1.25)); cx += 46;
  ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = "700 11px 'Courier New', monospace"; ctx.fillText(WORLD_ZOOM.toFixed(2) + '×', cx + 6, cy + 17);
  let tx = W - 60 - 3 * 66 - 2 * 6;
  for (const t of ['easy', 'normal', 'hard']) { arenaChip9(tx, cy, 66, 24, t.toUpperCase(), ARENA9.temper === t, () => arenaTemper9(t)); tx += 72; }
  ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = "700 11px 'Courier New', monospace"; ctx.fillText('KING’S TEMPER', W - 60 - 3 * 66 - 2 * 6 - 10, cy + 17);
  if (ARENA9.t < 10 && !ARENA9.result) { ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.font = "700 12px 'Courier New', monospace"; ctx.fillText('TAP A CARD TO DEPLOY  ·  DRAG TO LOOK  ·  PINCH OR WHEEL TO ZOOM  ·  TAP THE MAP TO JUMP  ·  GOLD IS YOURS, RED IS KING’S', W / 2, 128); }
  ctx.restore();
}
if (typeof window !== 'undefined') { window.ARENA9 = ARENA9; window.ARENA9_ROSTER = ARENA9_ROSTER; }
void GAME_VERSION;
