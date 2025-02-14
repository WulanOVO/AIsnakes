const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

startBtn.addEventListener('click', () => {
  RUNNING = true;
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
});

pauseBtn.addEventListener('click', () => {
  RUNNING = false;
  startBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
});

resetBtn.addEventListener('click', () => {
  reset();
  draw();
  updateStats();
});


const speedControl = document.getElementById('speed-control');
const speedValue = document.getElementById('speed-value');

speedValue.textContent = `${UPDATE_INTERVAL}ms`;
speedControl.addEventListener('input', (e) => {
  UPDATE_INTERVAL = parseInt(e.target.value);
  speedValue.textContent = `${UPDATE_INTERVAL}ms`;
});