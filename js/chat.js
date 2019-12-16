/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/chat.js
 * @version 1.0
 */

class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('chat-app', Chat)
export { Chat }
