/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/desktop.js
 * @version 1.0
 */

import { NewMemory } from './NewMemory.js'
import { memory } from './memory.js'

const template = document.createElement('template')
template.innerHTML = `
 <div class="memoryApp">
    <a href="#"><img src="/image/0.png" alt="A memory brick"></a>
 </div>
 `

class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.memoryApp = this.shadowRoot.querySelector('.memoryApp')
  }

  connectedCallback () {
    const memoryBtn = document.querySelector('#memory')

    // New memory game
    memoryBtn.addEventListener('click', e => {
      const newGame = new NewMemory()
      memory(newGame)
    })
  }
}
// är är planen att jag ska styra upp alla appar, ladda dem helt enkelt.

// On icon click... new Memory(), new LearnClock(), new Chat() and launch., then jump to right module.

// Men kom ihåg!!! Denna modul är bara ratten. Användaren clickar, denna modul fångar upp det och skickar till rätt metod.
// Begränsa koden i modulerna. Bättre med fler moduler.

window.customElements.define('memory-app', Desktop)
