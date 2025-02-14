class Food {
  constructor() {
    this.pos = { x: 0, y: 0 }; // 食物的初始位置
  }

  randomize(snakeBody, foods) {
    do {
      this.pos = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT)
      };
    } while (
      // 检查是否与蛇身体重合
      snakeBody.some(segment =>
        segment.x === this.pos.x && segment.y === this.pos.y
      ) ||
      // 检查是否与其他食物重合
      foods.some(food =>
        food !== this &&
        food.pos.x === this.pos.x &&
        food.pos.y === this.pos.y
      )
    );
  }
}

function drawFood(ctx, food) {
  drawSquare(ctx, food.pos, 0.5, '#a6a6a6')
}