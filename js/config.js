let RUNNING = true;

let UPDATE_INTERVAL = 300;

const GRID_SIZE = 20;

const START_POSITIONS = [
  { x: 5, y: 5 },      // 左上
  { x: 45, y: 5 },     // 右上
  { x: 5, y: 45 },     // 左下
  { x: 45, y: 45 },    // 右下
  { x: 25, y: 25 }     // 中间
];

const SNAKE_COLORS = ['#eb4d4b', '#f39c12', '#27ae60', '#2980b9', '#8e44ad'];