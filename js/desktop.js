/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/desktop.js
 * @version 1.0
 */

// import { NewMemory } from './NewMemory.js'
import { Memory } from './Memory.js'

// LÄGG TILL ETT STORLEKSVAL SOM STARTAR MEMORYT, MEMORY KNAPPEN SKA STARTAS FRÅN DESKTOP. MÅSTE ÄVEN ANVÄNDA new SÅ DET BLIR EN NY RUTA VARJE GÅNG.
// const memButton = document.querySelector('#memorybtn')

const memoBox = document.createElement('template')
memoBox.innerHTML = `
  <memory-app id="memory"></memory-app>
`

class Desktop extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    // Initiates a new memory-game
    const memoryBtn = document.querySelector('#memorybtn')
    memoryBtn.addEventListener('click', e => {
      e.preventDefault()
      this.shadowRoot.appendChild(new Memory())
    })
    // Initiates a new chat-window
    const chatBtn = document.querySelector('#chatbtn')
    chatBtn.addEventListener('click', e => {
      e.preventDefault()
    })
    // Initiates a new clock-exercise
    const clockBtn = document.querySelector('#clockbtn')
    clockBtn.addEventListener('clock', e => {
      e.preventDefault()
    })
  }
}

// FÖR ATT FLYTTA FÖR VAR GÅNG MAN STARTAR EN NY APP SÅ FÅR VI NOG ANVÄNDA KOORDINATER. INTE MARGIN.
// EXTRA FUNKTION KAN VARA ATT MINIMERA, MAN TAR BORT ALLT UNDER MENYRADEN, FLYTTAR SKITEN NER I HÖRNET, VID KLICK, ÅTERSTÄLL.

// Här är planen att jag ska styra upp alla appar, ladda dem helt enkelt.

// On icon click... new Memory(), new LearnClock(), new Chat() and launch., then jump to right module.

// Men kom ihåg!!! Denna modul är bara ratten. Användaren clickar, denna modul fångar upp det och skickar till rätt metod.
// Begränsa koden i modulerna. Bättre med fler moduler.

window.customElements.define('desktop-app', Desktop)
// export { desktop }
