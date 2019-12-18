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
<input type="text"></input>
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
    // Remove game-session
    const closeChat = this.shadowRoot.querySelector('#closeBtn')
    closeChat.addEventListener('click', e => {
      this.remove(Chat)
    })
  }

  initializeChat () {
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.appendChild(textField.content.cloneNode(true))
    this.shadowRoot.appendChild(chatField.content.cloneNode(true))
    this.shadowRoot.host.style.width = '300px'
    this.shadowRoot.host.style.height = '250px'

    const pTag = document.createElement('p')
    pTag.innerText = 'Hej hallå'
    this.shadowRoot.appendChild(pTag)

    // Movable window enabled.
    const box = this.shadowRoot.host
    draggableWindow(box)
  }
}

window.customElements.define('chat-app', Chat)
export { Chat }
