/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/LearnClock.js
 * @version 1.0
 */

import { template, draggableWindow } from './utils.js'

// Templates
const boxMenu = document.createElement('template')
boxMenu.innerHTML = `
<label>Clock</label>
<div id="topBar">
<button id="closeBtn">X</button>
<button id="minBtn">-</button>
</div>
`
const clockTemplate = document.createElement('template')
clockTemplate.innerHTML = `
<canvas id="clockCanvas" width="400" height="400"></canvas>
`

class LearnClock extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.initializeClock()
  }

  connectedCallback () {
    // Remove game-session
    const closeClock = this.shadowRoot.querySelector('#closeBtn')
    closeClock.addEventListener('click', e => {
      this.remove(LearnClock)
    })
  }

  /**
   * Clock assembled with help from 'https://www.w3schools.com/graphics/canvas_clock.asp'
   * Function to create a clock.
   */
  initializeClock () {
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(clockTemplate.content.cloneNode(true))

    // Movable window enabled.
    const box = this.shadowRoot.host
    draggableWindow(box)

    const canvas = this.shadowRoot.querySelector('#clockCanvas')
    const ctx = canvas.getContext('2d')
    let grad
    let radius = canvas.height / 2
    ctx.translate(radius, radius)
    radius = radius * 0.90
    drawClock()

    function drawClock () {
      ctx.arc(0, 0, radius, 0, 2 * Math.PI)
      ctx.fillStyle = 'white'
      ctx.fill()
      canvas.append(ctx)

      grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
      grad.addColorStop(0, '#333')
      grad.addColorStop(0.5, 'white')
      grad.addColorStop(1, '#333')
      ctx.strokeStyle = grad
      ctx.lineWidth = radius * 0.1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
      ctx.fillStyle = '#333'
      ctx.fill()
    }
  }
}

window.customElements.define('learnclock-app', LearnClock)
export { LearnClock }
// Användaren ska kunna välja antalet övningar, alltså hur många gånger man behöver svara på olika klockslag.
// Random tim, random min, gör om till enskilda heltal. Användaren ska svara 7.30, eller 07.30, kanske i separata rutor för tim å min.
