const GRID_SIZE = 20
const ARROW_RIGHT = 'ArrowRight'
const ARROW_DOWN = 'ArrowDown'
const ARROW_LEFT = 'ArrowLeft'
const ARROW_UP = 'ArrowUp'

let canvas
let canvasContext

const snake = {
  body: [
    { x: 60, y: 80 },
    { x: 40, y: 80 },
    { x: 20, y: 80 },
    { x: 0, y: 80 }
  ],
  direction: undefined
}

const apple = {
  x: 0,
  y: 0
}

newApple()

const score = document.querySelector('.points')
let playerScore = 0

window.onload = function () {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  let gameInterval = 100
  const DEBUG = false

  if (DEBUG) {
    apple.x = 120
    apple.y = 80

    gameInterval = 1000
  }
  setInterval(() => {
    drawCanvas()
    drawApple()
    const isSnakeAboutToEatApple = ateApple()
    if (isSnakeAboutToEatApple) {
      const clonedHead = JSON.parse(JSON.stringify(snake.body[0]))
      switch (snake.direction) {
        case ARROW_RIGHT:
          clonedHead.x += GRID_SIZE
          break
        case ARROW_DOWN:
          clonedHead.y += GRID_SIZE
          break
        case ARROW_LEFT:
          clonedHead.x -= GRID_SIZE
          break
        case ARROW_UP:
          clonedHead.y -= GRID_SIZE
          break
      }

      snake.body.unshift(clonedHead)
      playerScore++
      newApple()
    } else {
      moveSnake()
    }
    drawSnake()
    if (snakeCollision() || wallCollision()) {
      gameOver()
    }
    updateScore()
  }, gameInterval)
}

window.addEventListener('keydown', e => {
  const keyPress = e.key

  if (keyPress === 'ArrowDown' && snake.direction !== 'ArrowUp') {
    snake.direction = 'ArrowDown'
  } else if (keyPress === 'ArrowUp' && snake.direction !== 'ArrowDown') {
    snake.direction = 'ArrowUp'
  } else if (keyPress === 'ArrowRight' && snake.direction !== 'ArrowLeft') {
    snake.direction = 'ArrowRight'
  } else if (keyPress === 'ArrowLeft' && snake.direction !== 'ArrowRight') {
    snake.direction = 'ArrowLeft'
  }
})

function init () {
  score.textContent = 0
  newApple()
  snake.body = [
    { x: 60, y: 80 },
    { x: 40, y: 80 },
    { x: 20, y: 80 },
    { x: 0, y: 80 }
  ]
  snake.direction = ''
  playerScore = 0
}

function drawCanvas () {
  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {
  canvasContext.fillStyle = '#303030'
  canvasContext.fillRect(snake.body[0].x, snake.body[0].y, GRID_SIZE, GRID_SIZE)
  canvasContext.fillStyle = 'blue'
  for (let i = 1; i < snake.body.length; i++) {
    canvasContext.fillRect(snake.body[i].x, snake.body[i].y, GRID_SIZE, GRID_SIZE)
  }
}

function moveSnake () {
  if (!snake.direction) { return }

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i].x = snake.body[i - 1].x
    snake.body[i].y = snake.body[i - 1].y
  }
  if (snake.direction === 'ArrowUp') {
    snake.body[0].y -= GRID_SIZE
  } else if (snake.direction === 'ArrowRight') {
    snake.body[0].x += GRID_SIZE
  } else if (snake.direction === 'ArrowDown') {
    snake.body[0].y += GRID_SIZE
  } else if (snake.direction === 'ArrowLeft') {
    snake.body[0].x -= GRID_SIZE
  }
}

function drawApple () {
  canvasContext.fillStyle = '#b11b1b'
  canvasContext.fillRect(apple.x, apple.y, GRID_SIZE, GRID_SIZE)
}

function ateApple () {
  return snake.body[0].x === apple.x && snake.body[0].y === apple.y
}

function newApple () {
  const randomX = Math.random() * (780 + 20)
  apple.x = randomX - (randomX % 20)
  const randomY = Math.random() * (580 + 20)
  apple.y = randomY - (randomY % 20)

  snake.body.forEach(snake => {
    if (snake.x === apple.x && snake.y === apple.y) {
      newApple()
    }
  })
}

function snakeCollision () {
  for (let i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
      return true
    }
  }
}

function wallCollision () {
  if (snake.body[0].y < 0 || snake.body[0].y === canvas.height || snake.body[0].x === canvas.width || snake.body[0].x < 0) {
    return true
  }
}

function updateScore () {
  score.textContent = playerScore
  return playerScore
}

// MODAL //
const bodyBlackout = document.querySelector('.body-blackout')
const popupModal = document.querySelector('.popup-modal')
const imageContainer = document.querySelector('.image-container')

function gameOver () {
  popupModal.classList.add('is--visible')
  bodyBlackout.classList.add('is-blacked-out')

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    init()
  })

  bodyBlackout.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    init()
  })

  imageContainer.addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
    init()
  })
}
