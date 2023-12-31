import './style.css'

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

const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']")

const w = document.getElementById('w') as HTMLInputElement
let x = document.body.clientWidth / 2
let y = document.body.clientHeight / 2

const randomDirection = () => (Math.random() > 0.5 ? 1 : -1)
let dx = randomDirection()
let dy = randomDirection()

let prevColor: string

const animate = () => {
  if (!w) return

  const { screenWidth, screenHeight, wHalfWidth, wHalfHeight } = getDimensions()

  if (x < wHalfWidth || x > screenWidth - wHalfWidth) {
    dx *= -1
    updateColor()
  }

  if (y < wHalfHeight || y > screenHeight - wHalfHeight) {
    dy *= -1
    updateColor()
  }

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

  if (w) {
    w.src = imageSrc
  }
  if (favicon) {
    favicon.href = imageSrc
  }
}

const getDimensions = () => ({
  screenWidth: document.body.clientWidth,
  screenHeight: document.body.clientHeight,
  wHalfWidth: w.clientWidth / 2,
  wHalfHeight: w.clientHeight / 2,
})

window.onresize = () => {
  if (!w) return

  const { screenWidth, screenHeight, wHalfWidth, wHalfHeight } = getDimensions()

  if (x > screenWidth - wHalfWidth) {
    dx = -1
    x = screenWidth - wHalfWidth
  }

  if (y > screenHeight - wHalfHeight) {
    dy = -1
    y = screenHeight - wHalfHeight
  }
}

updateColor()

// Add transition after the image is inserted to avoid animation glitch
w.style.transition = 'all 100ms linear'

setInterval(animate, 100)
