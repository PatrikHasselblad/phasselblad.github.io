/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/Desktop.js
 * @version 1.0
 */

import { Memory } from './Memory.js'
import { Chat } from './Chat.js'
import { LearnClock } from './LearnClock.js'

/**
 * Class to listen and launch requested apps and handle global functions.
 * @constructor Constructs a shadow DOM where new instances of apps are executed in their own sub-shadow DOM.
 */
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
    // ------------------------- User should enter username, next go, app, check if username is empty from local storage, if not, just open a new.
    const chatBtn = document.querySelector('#chatbtn')
    chatBtn.addEventListener('click', e => {
      e.preventDefault()

      // Username check.
      let username = JSON.parse(window.localStorage.getItem('user')) || []
      console.log(username)
      if (username.length === 0) {
        username = this.setUsername()
      } else {
        this.shadowRoot.appendChild(new Chat(username))
      }
    })
    // Initiates a new clock-exercise
    const clockBtn = document.querySelector('#clockbtn')
    clockBtn.addEventListener('click', e => {
      e.preventDefault()
      this.shadowRoot.appendChild(new LearnClock())
    })
  }

  connectedCallback () {
    // Focus window here. I hope.
  }

  /**
   * Function to set username and launch chat.
   */
  setUsername () {
    document.querySelector('#username').classList.remove('hide')
    const subBtn = document.querySelector('#userSubBtn')

    subBtn.addEventListener('click', e => {
      e.preventDefault()
      const input = document.querySelector('#inputUser').value
      const username = { username: input }
      window.localStorage.setItem('user', JSON.stringify(input))
      document.querySelector('#username').classList.add('hide')
      this.shadowRoot.appendChild(new Chat(username))
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
