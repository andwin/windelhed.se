import './style.css'

const speed = 2
const colors = [
  '#00ff00',
  '#6a19ff',
  '#ae66f0',
  '#e124ff',
  '#ff2188',
  '#ff8800',
]

const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']")

const w = document.getElementById('w')
let x = document.body.clientWidth / 2
let y = document.body.clientHeight / 2
let dx = 1
let dy = 1

const animate = () => {
  if (!w) return

  const wWidth = w.clientWidth
  const wHeight = w.clientHeight
  const screenWidth = document.body.clientWidth
  const screenHeight = document.body.clientHeight

  if (x > screenWidth - wWidth) {
    dx = -1
    updateColor()
  }
  if (x < 0) {
    dx = 1
    updateColor()
  }
  if (y > screenHeight - wHeight) {
    dy = -1
    updateColor()
  }
  if (y < 0) {
    dy = 1
    updateColor()
  }

  x += speed * dx
  y += speed * dy

  w.style.left = x + 'px'
  w.style.top = y + 'px'

  window.requestAnimationFrame(animate)
}

const updateColor = (): void => {
  if (!w) return

  const prevColor = colorToHex(w.style.color)
  const newColor = colors[Math.floor(Math.random() * colors.length)]
  if (newColor === prevColor) return updateColor()

  w.style.color = newColor

  if (favicon) {
    favicon.href = `/${newColor.replace('#', '')}.svg`
  }
}

const colorToHex = (colorString: string) => {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return

  ctx.fillStyle = colorString
  return ctx.fillStyle
}

updateColor()
animate()
