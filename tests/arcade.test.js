import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the actual browser engine with only DOM, audio and drawing mocked.
function engine() {
  const elements = new Map();
  const context2d = new Proxy({}, { get: (_, key) => key.startsWith('create') ? () => ({ addColorStop() {} }) : () => {} });
  function element(id) {
    if (!elements.has(id)) {
      const classes = new Set();
      elements.set(id, { width: 960, height: 540, style: {}, textContent: '',
        classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) },
        addEventListener() {}, focus() {}, getContext: () => context2d });
    }
    return elements.get(id);
  }
  const sandbox = vm.createContext({
    document: { getElementById: element, querySelectorAll: () => [], addEventListener() {} },
    window: { addEventListener() {} }, matchMedia: () => ({ matches: false }),
    Image: class { complete = true; naturalWidth = 100; decode() { return Promise.resolve(); } },
    localStorage: { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } },
    performance: { now: () => 0 }, requestAnimationFrame() {}, console,
  });
  vm.runInContext(readFileSync('js/arcade.js', 'utf8'), sandbox);
  const run = code => vm.runInContext(code, sandbox);
  run('soundEnabled = false; launchStage(0);');
  return run;
}

test('pause and resume preserve position, health, score and enemies', () => {
  const run = engine();
  run('game.player.x=360; game.player.hp=3; game.score=500; spawnRegularDemit(); pauseGame();');
  const before = run('JSON.stringify(game)');
  run('updateGame();');
  assert.equal(run('JSON.stringify(game)'), before);
  run('resumeGame();');
  assert.equal(run('game.player.x'), 360);
  assert.equal(run('game.player.hp'), 3);
  assert.equal(run('game.score'), 500);
  assert.equal(run('game.enemies.length'), 1);
});

test('double jump is bounded and restart clears held input and cooldowns', () => {
  const run = engine();
  run('triggerJump(); triggerJump(); game.player.vy=0; triggerJump();');
  assert.equal(run('game.player.vy'), 0);
  run('keys.right=true; triggerDash(); game.score=500; launchStage(0);');
  assert.equal(run('keys.right'), false);
  assert.equal(run('game.player.dashCooldown'), 0);
  assert.equal(run('game.player.jumpsLeft'), 2);
  assert.equal(run('game.score'), 0);
});

test('three weapons produce their distinct projectiles and special consumes energy', () => {
  const run = engine();
  for (const [weapon, count] of [[0,1],[1,3],[2,1]]) {
    run(`game.bullets=[]; game.player.shootCooldown=0; selectWeapon(${weapon}); fireWeapon();`);
    assert.equal(run('game.bullets.length'), count);
    if (weapon === 2) assert.equal(run('game.bullets[0].pierce'), true);
  }
  run('spawnRegularDemit(); triggerSpecialBlast();');
  assert.equal(run('game.player.special'), 0);
  assert.ok(run('game.enemies[0].hp') < 0);
});

test('each of four stages spawns a boss and actual projectile hits complete it', () => {
  const run = engine();
  for (let stage = 0; stage < 4; stage++) {
    run(`launchStage(${stage}); game.kills=STAGES_DATA[game.stageIdx].killsNeeded; game.spawnCooldown=0; updateGame();`);
    assert.equal(run('game.bossSpawned'), true);
    // Place a high-damage projectile at the boss to isolate collision and result handling.
    run('game.bullets.push({x:game.enemies[0].x+40,y:game.enemies[0].y+40,vx:0,vy:0,r:10,dmg:1000,color:"#fff",pierce:false}); updateGame();');
    assert.equal(run('game.bossDefeated'), true);
    assert.equal(run('game.running'), false);
    assert.equal(run('document.getElementById("modal-stage-result").classList.contains("hidden")'), false);
    assert.ok(run('game.score') >= 600);
  }
});

test('invulnerability prevents stacked damage and defeat cannot award a win', () => {
  const run = engine();
  run('hurtPlayer(); hurtPlayer();');
  assert.equal(run('game.player.hp'), 4);
  run('game.player.hp=1; game.player.invulnTimer=0; hurtPlayer(); updateGame();');
  assert.equal(run('game.player.hp'), 0);
  assert.equal(run('game.running'), false);
  assert.equal(run('document.getElementById("result-badge").textContent'), 'GAME OVER');
});

test('60Hz fixed timestep keeps movement equal at 60Hz and 144Hz', () => {
  function distance(hz) {
    const run = engine();
    run(`keys.right=true; mainLoop(100); for(let i=1;i<=${hz};i++) mainLoop(100+i*1000/${hz});`);
    return run('game.player.x');
  }
  assert.ok(Math.abs(distance(60)-distance(144)) < 6);
});
