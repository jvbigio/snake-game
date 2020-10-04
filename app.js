let canvas
let canvasContext
let snakeX = 50
const snakeSpeedX = 50
let snakeY = 50
const snakeSpeedY = 50
const appleX = 50

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  const framesPerSecond = 30 // temp local variable

  setInterval(() => {
    drawCanvas()
    moveSnake()
    drawApple()
  }, 1000 / framesPerSecond)

  // setInterval(() => {
  //   drawCanvas()
  //   moveSnake()
  //   drawApple()
  // }, 50)
}

window.addEventListener('keydown', gameControls)

function gameControls (e) {
  switch (e.key) {
    case 'ArrowUp':
      // console.log('Up arrow press!')
      snakeY >= canvas.height ? alert('Game Over!') : snakeY += snakeSpeedY
      break
    case 'ArrowRight':
      // console.log('Right arrow press!')
      snakeX >= canvas.width ? alert('game over') : snakeX += snakeSpeedX
      // snakeX += snakeSpeedX
      break
    case 'ArrowDown':
      console.log('Down arrow press!')
      break
    case 'ArrowLeft':
      // console.log('Left arrow press!')
      snakeX < 0 ? alert('Game Over!') : snakeX -= snakeSpeedX
      break
  }
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function moveSnake () {
  // snakeX += 10
  // snakeY += 10
  canvasContext.fillStyle = 'blue'
  // below 100px from left, 200px from top, 50px wide, 25px tall:
  canvasContext.fillRect(snakeX, 200, 50, 20)
}

function drawApple () {
  // appleX
  canvasContext.fillStyle = 'red'
  canvasContext.fillRect(appleX, 100, 20, 20)
}
