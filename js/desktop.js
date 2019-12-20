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
    // Initial window margin
    let windowMargin = 30
    // let zLayer = 0

    // Initiates a new memory-game
    const memoryBtn = document.querySelector('#memorybtn')
    memoryBtn.addEventListener('click', e => {
      e.preventDefault()
      if (windowMargin >= 500) {
        windowMargin = 50
      } else {
        windowMargin += 20
      }
      const newMargin = windowMargin.toString()
      this.shadowRoot.appendChild(new Memory()).style.margin = newMargin + 'px'
    })
    // Initiates a new chat-window
    const chatBtn = document.querySelector('#chatbtn')
    chatBtn.addEventListener('click', e => {
      e.preventDefault()
      if (windowMargin >= 500) {
        windowMargin = 45
      } else {
        windowMargin += 20
      }
      const newMargin = windowMargin.toString()

      // Username check.
      const username = JSON.parse(window.sessionStorage.getItem('user')) || ''
      if (username === '') {
        this.setUsername(newMargin)
      } else {
        this.shadowRoot.appendChild(new Chat(username)).style.margin = newMargin + 'px'
      }
    })
    // Initiates a new clock-exercise
    const clockBtn = document.querySelector('#clockbtn')
    clockBtn.addEventListener('click', e => {
      e.preventDefault()
      if (windowMargin >= 500) {
        windowMargin = 45
      } else {
        windowMargin += 20
      }
      const newMargin = windowMargin.toString()
      this.shadowRoot.appendChild(new LearnClock()).style.margin = newMargin + 'px'
    })
  }

  connectedCallback () {
    // Focus window here. I hope.
  }

  /**
   * Function to set username and launch chat.
   */
  setUsername (newMargin) {
    document.querySelector('#username').classList.remove('hide')
    const subBtn = document.querySelector('#userSubBtn')
    const input = document.querySelector('#inputUser')

    // Submit-button submit.
    subBtn.addEventListener('click', e => {
      e.preventDefault()
      const input = document.querySelector('#inputUser').value
      const username = input
      window.sessionStorage.setItem('user', JSON.stringify(input))
      document.querySelector('#username').classList.add('hide')
      this.shadowRoot.appendChild(new Chat(username)).style.margin = newMargin + 'px'
    })

    // Return-key submit.
    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        const input = document.querySelector('#inputUser').value
        const username = input
        window.sessionStorage.setItem('user', JSON.stringify(input))
        document.querySelector('#username').classList.add('hide')
        this.shadowRoot.appendChild(new Chat(username)).style.margin = newMargin + 'px'
      }
    })
  }
}

window.customElements.define('desktop-app', Desktop)
