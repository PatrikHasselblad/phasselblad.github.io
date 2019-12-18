/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/Chat.js
 * @version 1.0
 */

import { template, draggableWindow } from './utils.js'

// Templates
const boxMenu = document.createElement('template')
boxMenu.innerHTML = `
<label>Chat</label>
<div id="topBar">
<button id="closeBtn">X</button>
<button id="minBtn">-</button>
</div>
`
const textField = document.createElement('template')
textField.innerHTML = `
<div id="chatField">
<input id="textfield" type="text"></input>
<button id="sendBtn">Send</button>
</div>
`
const chatField = document.createElement('template')
chatField.innerHTML = `
<div id="chat"></div>
`
/**
 * Constructs a new and independent chat window.
 */
class Chat extends window.HTMLElement {
  constructor (user) {
    super()
    // -----------------Vid start, ladda upp den sparade historiken genom att loopa igenom arrayen och lägga en li på varje.
    this.attachShadow({ mode: 'open' })
    this.initializeChat()
    this.user = user
    console.log(this.user)
  }

  connectedCallback () {
    // Remove chat-session & close socket. ---------- Kanske fixa så att meddelanden spars. Hur som helst måste det finnas meddelande historik.
    const closeChat = this.shadowRoot.querySelector('#closeBtn')
    closeChat.addEventListener('click', e => {
      this.socket.close()
      this.remove(Chat)
    })
  }

  /**
   * Function to initialize chat and add it to the shadow Dom.
   */
  initializeChat () {
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(textField.content.cloneNode(true))
    this.shadowRoot.appendChild(chatField.content.cloneNode(true))
    this.shadowRoot.host.style.width = '300px'
    this.shadowRoot.host.style.height = '450px'
    this.webSocket()

    // Movable window enabled.
    const box = this.shadowRoot.host
    draggableWindow(box)
  }

  /**
   * Function to open websocket, send & recieve messages aswell as saving to local storage.
   */
  async webSocket () { // Vet inte om den behöver vara async, men det kan ju inte skada...
    // Send a message
    const sendBtn = this.shadowRoot.querySelector('#sendBtn')
    const textInput = this.shadowRoot.querySelector('#textfield')

    sendBtn.addEventListener('click', e => {
      const data = {
        type: 'message',
        data: textInput.value,
        username: this.user,
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      this.socket.send(JSON.stringify(data))
      textInput.value = ''
    })

    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')

    this.socket.onopen = async () => {
      console.log('connected')
    }
    this.socket.onclose = () => {
      console.error('disconnected')
    }
    this.socket.onerror = (error) => {
      console.error('Failed to connect', error)
    }

    this.socket.onmessage = (e) => {
      // if (e.data.type === 'message') {
      //   console.log('test', e.data)---------------------Spara varje svar på local storage, upp till ett passande antal.
      // } else {
      const returnMessage = JSON.parse(e.data)
      if (returnMessage.type !== 'heartbeat') {
        const position = this.shadowRoot.querySelector('#chat')
        const liTag = document.createElement('li')
        liTag.setAttribute('type', 'none')
        liTag.innerText = '<' + returnMessage.username + '> ' + returnMessage.data
        position.appendChild(liTag)
      }
    }
  }
}

// någon som vill lägga ett meddelande i chatten? vill bara dubbelkolla så ena förbättringen funkar :smile:
// tack, om det är någon av er som är "L" ^^
// visste inte att man kunde göra const messageTemplate = incomingMessageTemplate.content.cloneNode(true) messageTemplate.querySelector('#blabla') osv

window.customElements.define('chat-app', Chat)
export { Chat }
