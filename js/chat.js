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

class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.initializeChat()
  }

  connectedCallback () {
    // Remove chat-session & close socket. ---------- Kanske fixa så att meddelanden spars. Hur som helst måste det finnas meddelande historik.
    const closeChat = this.shadowRoot.querySelector('#closeBtn')
    closeChat.addEventListener('click', e => {
      this.socket.close()
      this.remove(Chat)
    })
  }

  initializeChat () {
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(textField.content.cloneNode(true))
    this.shadowRoot.appendChild(chatField.content.cloneNode(true))
    this.shadowRoot.host.style.width = '300px'
    this.shadowRoot.host.style.height = '450px'

    // Movable window enabled.
    const box = this.shadowRoot.host
    draggableWindow(box)

    // Send a message
    const sendBtn = this.shadowRoot.querySelector('#sendBtn')
    const textInput = this.shadowRoot.querySelector('#textfield')

    sendBtn.addEventListener('click', e => {
      this.message = textInput.value
      this.webSocket()
    })
  }

  async webSocket () {
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    const data = {
      type: 'message',
      data: this.message,
      username: 'PH',
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.socket.addEventListener('open', event => {
      this.socket.send(JSON.stringify(data))
    })
    this.socket.addEventListener('message', event => {
      if (event.data.type === 'message') {
        console.log('test', event.data)
      } else {
        console.log('utan', event.data)
        const returnMessage = JSON.parse(event.data)
        if (returnMessage.type !== 'heartbeat') {
          const position = this.shadowRoot.querySelector('#chat')
          const pTag = document.createElement('p')
          pTag.innerText = '<' + returnMessage.username + '> ' + returnMessage.data
          position.appendChild(pTag)
        }
      }
    })
  }
}

// någon som vill lägga ett meddelande i chatten? vill bara dubbelkolla så ena förbättringen funkar :smile:
// tack, om det är någon av er som är "L" ^^
// visste inte att man kunde göra const messageTemplate = incomingMessageTemplate.content.cloneNode(true) messageTemplate.querySelector('#blabla') osv

window.customElements.define('chat-app', Chat)
export { Chat }
