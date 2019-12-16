/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/learnClock.js
 * @version 1.0
 */

class LearnClock extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('learnclock-app', LearnClock)
export { LearnClock }
// Användaren ska kunna välja antalet övningar, alltså hur många gånger man behöver svara på olika klockslag.
// Random tim, random min, gör om till enskilda heltal. Användaren ska svara 7.30, eller 07.30, kanske i separata rutor för tim å min.
