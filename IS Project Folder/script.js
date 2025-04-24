const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const box = 20; // size of one square

let snake = [{ x: 8 * box, y: 8 * box }];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};
let direction = '';
let score = 0;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  else if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
  else if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  else if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let part of snake) {
    ctx.fillStyle = '#00FF00'; // Bright green color for the snake
    ctx.fillRect(part.x, part.y, box, box);
  }

  ctx.fillStyle = '#006400'; // Dark green color for the food
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === 'up') head.y -= box;
  else if (direction === 'down') head.y += box;
  else if (direction === 'left') head.x -= box;
  else if (direction === 'right') head.x += box;

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * 20) * box;
    food.y = Math.floor(Math.random() * 20) * box;
    score++;
    document.getElementById('score').innerText = `Score: ${score}`;
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(part => part.x === head.x && part.y === head.y)) {
    alert('Game Over!');
    snake = [{ x: 8 * box, y: 8 * box }];
    direction = '';
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    return;
  }

  snake.unshift(head);
}

document.getElementById('startGame').addEventListener('click', () => {
  setInterval(drawGame, 100);
});