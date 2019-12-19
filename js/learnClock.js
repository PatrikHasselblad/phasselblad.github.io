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
const answerBarTemplate = document.createElement('template')
answerBarTemplate.innerHTML = `
<div id="answerBar">
<label>Hour:&#32<input id="hourIn" type="number" maxlength="10" size="5"></label>
<label>Min:&#32<input id="minIn" max="2" type="number" size="5"></label>
<button id="clockAnswerBtn">Check</button>
<p id="returnAnswer"></p>
</div>
`

class LearnClock extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const taskTag = document.createElement('h2')
    taskTag.innerText = 'What time is it?'
    this.shadowRoot.appendChild(taskTag)

    this.shadowRoot.appendChild(clockTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(answerBarTemplate.content.cloneNode(true))

    // Movable window enabled.
    const box = this.shadowRoot.host
    draggableWindow(box)

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
    const canvas = this.shadowRoot.querySelector('#clockCanvas')
    const hourAnswer = this.shadowRoot.querySelector('#hourIn')
    const minAnswer = this.shadowRoot.querySelector('#minIn')
    const ctx = canvas.getContext('2d')
    let radius = canvas.height / 2
    ctx.translate(radius, radius)
    radius = radius * 0.90
    let hour = 0
    let minute = 0
    let hourReal = 0
    let minReal = 0
    drawClock(ctx, radius)

    // Check if answer is correct and continues. -----------------------Also, add answer if it is correct. compare arrays perhaps, easier than strings, dont forget to remove zero's if any.
    const updateClock = this.shadowRoot.querySelector('#clockAnswerBtn')
    updateClock.addEventListener('click', e => {
      e.preventDefault()
      answerCheck()
      drawClock()
    })

    /**
     * Function to draw clock cirles and add color to them.
     */
    function drawClock () {
      drawFace()
      drawNumbers(ctx, radius)
      drawTime(ctx, radius)
    }

    function getX (ang) {
      return Math.sin(ang + Math.PI)
    }

    function getY (ang) {
      return Math.cos(ang + Math.PI)
    }

    function drawFace () {
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, 2 * Math.PI)
      ctx.fillStyle = 'white'
      ctx.fill()
      canvas.append(ctx)

      const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
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

    function drawNumbers (ctx, radius) {
      ctx.font = radius * 0.15 + 'px arial'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      for (let num = 1; num < 13; num++) {
        const ang = num * Math.PI / 6
        ctx.rotate(ang)
        ctx.translate(0, -radius * 0.85)
        ctx.rotate(-ang)
        ctx.fillText(num.toString(), 0, 0)
        ctx.rotate(ang)
        ctx.translate(0, radius * 0.85)
        ctx.rotate(-ang)
      }

      ctx.lineWidth = 5
      ctx.strokeStyle = '#000000'
      for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          const x = getX(Math.PI / 30 * i)
          const y = getY(Math.PI / 30 * i)
          ctx.beginPath()
          ctx.moveTo(x * 117, y * 117)
          ctx.lineTo(x * 125, y * 125)
          ctx.stroke()
        }
      }
    }

    function drawTime (ctx, radius) {
    /*  const now = new Date()
      let hour = now.getHours() // ---------------------Här sätter vi random. Tar bort setInterval, gör en string eller nåt som
      let minute = now.getMinutes() // -----------------registrerar tiden, - sekund, sedan jämför vi svaret med strängen, om fel
      let second = now.getSeconds() // -----------------'oj vad synd' och visar korrekt tid och svar, annars 'Bra jobbat å 1 poäng.
      */
      hour = Math.floor(Math.random() * (13 - 1) + 1)
      minute = Math.floor(Math.random() * (60 - 1) + 1)
      console.log('Tim: ' + hour + ' Min: ' + minute)
      hourReal = hour
      minReal = minute

      hour = hour % 12
      hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) // + (second * Math.PI / (360 * 60))
      drawHand(ctx, hour, radius * 0.5, radius * 0.07)

      minute = (minute * Math.PI / 30) // + (second * Math.PI / (30 * 60))
      drawHand(ctx, minute, radius * 0.8, radius * 0.07)

    // second = (second * Math.PI / 30)
    // drawHand(ctx, second, radius * 0.9, radius * 0.02)
    }

    function drawHand (ctx, pos, length, width) {
      ctx.beginPath()
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.moveTo(0, 0)
      ctx.rotate(pos)
      ctx.lineTo(0, -length)
      ctx.stroke()
      ctx.rotate(-pos)
    }
    function answerCheck () {
      const answerTag = this.shadowRoot.querySelector('#returnAnswer')
      console.log(hourReal, minReal)
      let hour = hourAnswer.value
      let min = minAnswer.value
      let newHour = hourReal.toString()
      let newMin = minReal.toString()

      // If no input value, add a 0.
      if (hour.length === 0) {
        hour = '0'
      }
      if (min.length === 0) {
        min = '0'
      }

      // For better printout, add 0 if single int.
      if (newHour.length === 1) {
        newHour = ('0' + newHour)
      }
      if (newMin.length === 1) {
        newMin = (newMin + '0')
      }
      if (hour.length === 1) {
        hour = ('0' + hour)
      }
      if (min.length === 1) {
        min = (min + '0')
      }

      console.log('Klockan är ' + hour + ':' + min)
      const correctTime = 'Korrekt svar skulle ha varit ' + newHour + ':' + newMin

      if (hour === newHour && min === newMin) {
        console.log('Correct!')
        answerTag.innerText = 'Correct!'
        returnAnswer(answerTag)
      } else {
        console.log(correctTime)
        answerTag.innerText = correctTime
        returnAnswer(answerTag)
      }
      hourAnswer.value = ''
      minAnswer.value = ''
    }

    function returnAnswer (answerTag) {
      this.shadowRoot.appendChild(answerTag)
    }
  }
}

// Användaren ska kunna välja antalet övningar, alltså hur många gånger man behöver svara på olika klockslag.

window.customElements.define('learnclock-app', LearnClock)
export { LearnClock }
