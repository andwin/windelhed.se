import './style.css'

import confetti from 'canvas-confetti'
import iconRaw from '../public/w.svg?raw'

const speed = 10
const colors = [
  '#00ff00',
  '#6a19ff',
  '#ae66f0',
  '#e124ff',
  '#ff2188',
  '#ff8800',
]

const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']") as HTMLLinkElement

const w = document.getElementById('w') as HTMLInputElement
let x = document.body.clientWidth / 2
let y = document.body.clientHeight / 2

const randomDirection = () => (Math.random() > 0.5 ? 1 : -1)
let dx = randomDirection()
let dy = randomDirection()

let prevColor: string
let disableConfetti = false
let enebleConfettiTimeout: number | null = null

const animate = () => {
  const { screenWidth, screenHeight, wHalfWidth, wHalfHeight } = getDimensions()
  let numberOfCollisions = 0

  if (x < wHalfWidth || x > screenWidth - wHalfWidth) {
    numberOfCollisions++
    dx *= -1
  }

  if (y < wHalfHeight || y > screenHeight - wHalfHeight) {
    numberOfCollisions++
    dy *= -1
  }

  if (numberOfCollisions > 0) updateColor()
  if (numberOfCollisions === 2) displayConfetti()

  x += speed * dx
  y += speed * dy

  w.style.left = `${x}px`
  w.style.top = `${y}px`
}

const updateColor = (): void => {
  const newColor = colors[Math.floor(Math.random() * colors.length)]
  if (newColor === prevColor) return updateColor()
  prevColor = newColor

  const svgString = iconRaw.replace('#e124ff', newColor)
  const imageSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

  w.src = imageSrc
  favicon.href = imageSrc
}

const getDimensions = () => ({
  screenWidth: document.body.clientWidth,
  screenHeight: document.body.clientHeight,
  wHalfWidth: w.clientWidth / 2,
  wHalfHeight: w.clientHeight / 2,
})

window.onresize = () => {
  const { screenWidth, screenHeight, wHalfWidth, wHalfHeight } = getDimensions()

  if (x > screenWidth - wHalfWidth) {
    dx = -1
    x = screenWidth - wHalfWidth
  }

  if (y > screenHeight - wHalfHeight) {
    dy = -1
    y = screenHeight - wHalfHeight
  }

  // Disable confetti while resizing
  disableConfetti = true
  if (enebleConfettiTimeout) clearTimeout(enebleConfettiTimeout)
  enebleConfettiTimeout = setTimeout(() => { disableConfetti = false }, 500)
}

const displayConfetti = () => {
  if (disableConfetti) return

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 1 },
  })
}

updateColor()

// Add transition after the image is inserted to avoid animation glitch
w.style.transition = 'all 100ms linear'

setInterval(animate, 100)
