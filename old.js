//players.push(new Player({ name: 'Player2', x: SCREEN_WIDTH / 2 - 50, y: SCREEN_HEIGHT / 2 + 50, dx: 0, dy: 0, size: 32, angle: 0.0, keys: { up: P2_UP, down: P2_DOWN, left: P2_LEFT, right: P2_RIGHT, fire: P2_FIRE } }));

// frameTime = { previous: 0, secondsPassed: 0 };
// window.requestAnimationFrame(frame);

// function frame(time) {
//   window.requestAnimationFrame(frame);
//   frameTime = { secondsPassed: (time - frameTime.previous) / 1000, previous: time };
//   update(frameTime.secondsPassed);
//   draw(ctx);
// }

// let previousTimeMs = 0;
// function frame() {
//   requestAnimationFrame((currentTimeMs) => {
//     const deltaTimeMs = currentTimeMs - previousTimeMs;
//     if (deltaTimeMs >= FRAME_INTERVAL) {
//       update(FRAME_INTERVAL);
//       const offset = deltaTimeMs % FRAME_INTERVAL;
//       previousTimeMs = currentTimeMs - offset;
//     }
//     draw(ctx);
//
//     frame();
//   });
// }
