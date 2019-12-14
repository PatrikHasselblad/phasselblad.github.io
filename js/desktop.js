/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/desktop.js
 * @version 1.0
 */

// import { NewMemory } from './NewMemory.js'
import { Memory } from './Memory.js'

// LÄGG TILL ETT STORLEKSVAL SOM STARTAR MEMORYT, MEMORY KNAPPEN SKA STARTAS FRÅN DESKTOP. MÅSTE ÄVEN ANVÄNDA new SÅ DET BLIR EN NY RUTA VARJE GÅNG.
const memButton = document.querySelector('#memorybtn')

memButton.addEventListener('click', e => {
  e.preventDefault()
  const game = new Memory()
})

// är är planen att jag ska styra upp alla appar, ladda dem helt enkelt.

// On icon click... new Memory(), new LearnClock(), new Chat() and launch., then jump to right module.

// Men kom ihåg!!! Denna modul är bara ratten. Användaren clickar, denna modul fångar upp det och skickar till rätt metod.
// Begränsa koden i modulerna. Bättre med fler moduler.

// window.customElements.define('desktop-app', Desktop)
// export { desktop }
