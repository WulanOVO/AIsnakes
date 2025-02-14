function update(timestamp) {
  if (!RUNNING || timestamp - lastUpdate < UPDATE_INTERVAL) {
    requestAnimationFrame(update);
    return;
  }
  lastUpdate = timestamp;

  snakes.forEach(snake => updateSnake(snake));

  draw();
  updateStats();
  requestAnimationFrame(update);
}

function draw() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snakes.forEach(snake => drawSnake(ctx, snake));
  foods.forEach(food => drawFood(ctx, food));
}

function updateStats() {
  const statsContainer = document.getElementById('snake-stats');
  const longestSnake = snakes.reduce((longest, current) =>
    current.body.length > longest.body.length ? current : longest
  );

  statsContainer.innerHTML = snakes.map(snake => `
    <div class="snake-card ${snake === longestSnake ? 'leader' : ''}"
         style="background: ${snake.color}">
      <div class="stat-row">
        <span>当前长度:</span>
        <span>${snake.body.length}</span>
      </div>
      <div class="stat-row">
        <span>最长长度:</span>
        <span>${snake.stats.maxLength}</span>
      </div>
      <div class="stat-row">
        <span>击杀数:</span>
        <span>${snake.stats.kills}</span>
      </div>
      <div class="stat-row">
        <span>死亡数:</span>
        <span>${snake.stats.deaths}</span>
      </div>
    </div>
  `).join('');
}

function reset() {
  // 初始化蛇和食物
  snakes = SNAKE_COLORS.map((color, index) => new Snake(color, index));
  foods = SNAKE_COLORS.map(() => new Food());
  // 随机化食物位置
  foods.forEach(food => food.randomize(snakes.flatMap(s => s.body), foods));
}

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const GRID_COUNT = canvas.width / GRID_SIZE;

let lastUpdate = 0;

let snakes = [];
let foods = [];

reset();
requestAnimationFrame(update);