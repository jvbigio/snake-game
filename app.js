let canvas
let canvasContext
const snakeX = 50
const snakeY = 50
const appleX = 50

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  setInterval(() => {
    drawCanvas()
    moveSnake()
    drawApple()
  }, 50)
  // works:
  // window.addEventListener('keydown', e => {
  //   if (e.key === 'ArrowUp') {
  //     console.log('Up arrow press!')
  //   }
}

window.addEventListener('keydown', gameControls)

function gameControls (e) {
  // if (e.key === 'ArrowUp') {
  //   console.log('Up arrow press!')
  // }
  switch (e.key) {
    case 'ArrowUp':
      console.log('Up arrow press!')
      break
    case 'ArrowRight':
      console.log('Right arrow press!')
      break
    case 'ArrowDown':
      console.log('Down arrow press!')
      break
    case 'ArrowLeft':
      console.log('Left arrow press!')
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
