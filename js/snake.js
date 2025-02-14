const OPPOSITE_DIRECTIONS = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};

class Snake {
  constructor(color, index) {
    this.color = color;
    this.index = index;
    this.iq = Math.random() * 0.3 + 0.7; // 0.7-1.0
    this.stats = {
      kills: 0,
      deaths: 0,
      maxLength: 3
    };

    this.reset();
  }

  reset() {
    const pos = START_POSITIONS[this.index];
    this.direction = pos.x < GRID_COUNT / 2 ? 'right' : 'left';

    this.body = [
      { x: pos.x, y: pos.y },
      { x: pos.x - (this.direction === 'right' ? 1 : -1), y: pos.y },
      { x: pos.x - (this.direction === 'right' ? 2 : -2), y: pos.y }
    ];
  }

  updateStats() {
    if (this.body.length > this.stats.maxLength) {
      this.stats.maxLength = this.body.length;
    }
  }

  get length() {
    return this.body.length;
  }

  get head() {
    return this.body[0];
  }
}

function getDirectionToFood(snake) {
  let targetFood;
  targetFood = foods.reduce((closest, current) =>
    distance(snake.head, current.pos) < distance(snake.head, closest.pos) ? current : closest
    , foods[0]);

  const dx = targetFood.pos.x - snake.head.x;
  const dy = targetFood.pos.y - snake.head.y;
  const preferredDirections = [];

  if (dx > 0) preferredDirections.push('right');
  else if (dx < 0) preferredDirections.push('left');
  if (dy > 0) preferredDirections.push('down');
  else if (dy < 0) preferredDirections.push('up');

  return preferredDirections;
}

function getSafeDirections(snake) {
  const directions = [];
  const current = snake.head;

  if (!willCollide({ x: current.x, y: current.y - 1 })) directions.push('up');
  if (!willCollide({ x: current.x, y: current.y + 1 })) directions.push('down');
  if (!willCollide({ x: current.x - 1, y: current.y })) directions.push('left');
  if (!willCollide({ x: current.x + 1, y: current.y })) directions.push('right');

  return directions;
}

function updateDirection(snake) {
  const willStray = Math.random() > snake.iq * 0.7 + 0.3;
  const ignoreSafety = Math.random() > snake.iq * 0.5 + 0.5;

  if (!ignoreSafety) {
    const safeDirections = getSafeDirections(snake);
    if (safeDirections.length === 0) return;

    const preferredDirections = getDirectionToFood(snake);
    const validDirections = preferredDirections.filter(d => safeDirections.includes(d));

    if (validDirections.length > 0 && !willStray) {
      // 如果有有效的方向，则随机选择其中一个
      snake.nextDirection = validDirections[
        Math.floor(Math.random() * validDirections.length)
      ];
    } else {
      // 如果没有有效的方向或“偏离方向”，则随机选择一个安全的方向
      snake.nextDirection = safeDirections[
        Math.floor(Math.random() * safeDirections.length)
      ];
    }
  } else {
    // 如果“忽略安全”，则随机选择一个方向（但不包括反方向）
    const allDirections = ['up', 'down', 'left', 'right']
      .filter(d => d !== OPPOSITE_DIRECTIONS[snake.direction]);

    snake.nextDirection = allDirections[
      Math.floor(Math.random() * allDirections.length)
    ];
  }
}

function updateSnake(snake) {
  updateDirection(snake);
  snake.direction = snake.nextDirection;

  const newHead = { ...snake.head };
  switch (snake.direction) {
    case 'up': newHead.y--; break;
    case 'down': newHead.y++; break;
    case 'left': newHead.x--; break;
    case 'right': newHead.x++; break;
  }

  // 检查是否与其他蛇发生碰撞
  if (willCollide(newHead)) {
    const collidedSnake = snakes.find(otherSnake =>
      otherSnake !== snake &&
      otherSnake.body.some(segment =>
        segment.x === newHead.x && segment.y === newHead.y
      )
    );

    if (collidedSnake) {
      collidedSnake.stats.kills++;
    }

    snake.stats.deaths++;
    snake.reset();
    return;
  }

  snake.body.unshift(newHead);

  // 检查是否吃到任何食物
  const foodEaten = foods.find(food =>
    newHead.x === food.pos.x && newHead.y === food.pos.y
  );

  if (foodEaten) {
    foodEaten.randomize(snakes.flatMap(s => s.body), foods);
    snake.updateStats();
  } else {
    snake.body.pop();
  }
}

function drawSnake(ctx, snake) {
  snake.body.forEach((segment, index) => {
    if (index === 0) {
      drawSquare(ctx, segment, 1, darkenColor(snake.color, 0.3));
    } else {
      drawSquare(ctx, segment, 1, snake.color);
    }
  });
}