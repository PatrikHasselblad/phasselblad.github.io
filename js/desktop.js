/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/Desktop.js
 * @version 1.0
 */

import { Memory } from './Memory.js'
import { Chat } from './Chat.js'
import { LearnClock } from './LearnClock.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
:host #desktopApp {
  width: 100%;
  height: 100%;
}
<style>
`

/**
 * Class to listen and launch requested apps and handle global functions.
 * @constructor Constructs a shadow DOM where new instances of apps are executed in their own sub-shadow DOM.
 */
class Desktop extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    // Initiates a new memory-game
    const memoryBtn = document.querySelector('#memorybtn')
    memoryBtn.addEventListener('click', e => {
      e.preventDefault()
      this.shadowRoot.appendChild(new Memory())
      const box = this.shadowRoot.querySelector('memory-app')
      this.draggableWindow(box)
    })
    // Initiates a new chat-window
    const chatBtn = document.querySelector('#chatbtn')
    chatBtn.addEventListener('click', e => {
      e.preventDefault()
      this.shadowRoot.appendChild(new Chat())
      const box = this.shadowRoot.querySelector('chat-app')
      this.draggableWindow(box)
    })
    // Initiates a new clock-exercise
    const clockBtn = document.querySelector('#clockbtn')
    clockBtn.addEventListener('click', e => {
      e.preventDefault()
      this.shadowRoot.appendChild(new LearnClock())
      const box = this.shadowRoot.querySelector('learnclock-app')
      this.draggableWindow(box)
    })
  }

  connectedCallback () {
  }

  draggableWindow (divBox) {
    const box = divBox
    // const container = document.querySelector('.wrapper')

    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let xOffset = 0
    let yOffset = 0

    box.addEventListener('touchstart', dragStart, { passive: true })
    box.addEventListener('touchend', dragEnd, false)
    box.addEventListener('touchmove', drag, { passive: true })
    box.addEventListener('mousedown', dragStart, false)
    box.addEventListener('mouseup', dragEnd, false)
    box.addEventListener('mousemove', drag, false)

    function dragStart (e) {
      if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset
        initialY = e.touches[0].clientY - yOffset
      } else {
        initialX = e.clientX - xOffset
        initialY = e.clientY - yOffset
      }
      if (e.target === box) {
        active = true
      }
      console.log(currentX, currentY)
    }
    function dragEnd (e) {
      initialX = currentX
      initialY = currentY

      active = false
    }
    function drag (e) {
      if (active) {
        // e.preventDefault()

        if (e.type === 'touchmove') {
          currentX = e.touches[0].clientX - initialX
          currentY = e.touches[0].clientY - initialY
        } else {
          currentX = e.clientX - initialX
          currentY = e.clientY - initialY
        }
        xOffset = currentX
        yOffset = currentY

        setTranslate(currentX, currentY, box)
      }
    }
    function setTranslate (xPos, yPos, element) {
      element.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    }
  }
}

// FÖR ATT FLYTTA FÖR VAR GÅNG MAN STARTAR EN NY APP SÅ FÅR VI NOG ANVÄNDA KOORDINATER. INTE MARGIN.
// EXTRA FUNKTION KAN VARA ATT MINIMERA, MAN TAR BORT ALLT UNDER MENYRADEN, FLYTTAR SKITEN NER I HÖRNET, VID KLICK, ÅTERSTÄLL.

// Här är planen att jag ska styra upp alla appar, ladda dem helt enkelt.

// On icon click... new Memory(), new LearnClock(), new Chat() and launch., then jump to right module.

// Men kom ihåg!!! Denna modul är bara ratten. Användaren clickar, denna modul fångar upp det och skickar till rätt metod.
// Begränsa koden i modulerna. Bättre med fler moduler.

window.customElements.define('desktop-app', Desktop)
