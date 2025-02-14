function distance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
}

function willCollide(pos) {
  return (
    pos.x < 0 || pos.x >= GRID_COUNT ||
    pos.y < 0 || pos.y >= GRID_COUNT ||
    snakes.some(snake =>
      snake.body.some(segment =>
        segment.x === pos.x &&
        segment.y === pos.y
      )
    )
  );
}

function darkenColor(hex, percent) {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >>  8) & 0xff;
  const b = (num >>  0) & 0xff;

  const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

  return `#${(1 << 24 | newR << 16 | newG << 8 | newB).toString(16).slice(1)}`;
}

function drawSquare(ctx, pos, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
    pos.x * GRID_SIZE + (GRID_SIZE - size * GRID_SIZE) / 2,
    pos.y * GRID_SIZE + (GRID_SIZE - size * GRID_SIZE) / 2,
    size * GRID_SIZE - 1,
    size * GRID_SIZE - 1
  );
}