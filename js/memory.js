/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/Memory.js
 * @version 1.0
 */

import { NewMemory } from './NewMemory.js'
import { template, draggableWindow } from './utils.js'

// Templates
const boxMenu = document.createElement('template')
boxMenu.innerHTML = `
<label>Memory</label>
<div id="topBar">
<button id="closeBtn">X</button>
<button id="minBtn">-</button>
</div>
`
/**
 * Class to handle a new memory game session.
* @constructor - Constructs a new Memory game.
*/
class Memory extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.initializeGame()
  }

  connectedCallback () {
    this.pairs = 0
    this.tries = 0
    this.turn1 = null
    this.turn2 = null
    this.lastTile = null

    // Remove game-session
    const closeMem = this.shadowRoot.querySelector('#closeBtn')
    closeMem.addEventListener('click', e => {
      this.remove(Memory)
    })
  }

  /**
   * Function to initialize game essentials.
   * @param {Number} size - The size of the game.
   */
  initializeGame () {
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.temp = document.querySelectorAll('#memoryBox')[0].content.firstElementChild

    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const sizeButton = document.querySelectorAll('#sizeTemplate')[0].content.firstElementChild
    this.shadowRoot.host.style.zIndex = '0'
    // Movable window enabled.
    const box = this.shadowRoot.host
    draggableWindow(box)

    let size = 0

    // User defined game-size
    for (let i = 2; i < 7; i += 2) {
      sizeButton.id = i
      sizeButton.innerText = (i + ' by ' + i)
      this.buttons = document.importNode(sizeButton, true)
      this.shadowRoot.appendChild(this.buttons)

      this.buttons.addEventListener('click', e => {
        e.preventDefault()
        size = e.target.id

        this.newGame = new NewMemory(size, size)
        this.playMemory()
      })
    }
  }

  /**
   * Function to produce set amount of bricks and to listen for brick turns.
   * @param {node} a - The clicked brick carrying a tile-number.
   */
  playMemory () {
    const removeButtons = this.shadowRoot.querySelectorAll('.size')
    for (let i = 0; i < removeButtons.length; i++) {
      this.shadowRoot.removeChild(removeButtons[i])
    }
    this.rows = this.newGame.rows
    this.cols = this.newGame.cols
    this.tiles = this.getPictureArray()

    this.tiles.forEach((tile, index) => {
      const a = document.importNode(this.temp, true)
      this.shadowRoot.appendChild(a)

      a.addEventListener('click', e => {
        e.preventDefault()
        const img = e.target.nodeName === 'IMG' ? e.target : e.target.firstElementChild
        this.turnBrick(tile, img)
      })

      if ((index + 1) % this.cols === 0) {
        this.shadowRoot.appendChild(document.createElement('br'))
      }
    })
  }

  /**
   * Function to handle game logic.
   * @param {Number} tile - Brick number.
   * @param {String} img - image connected to tile number.
   */
  turnBrick (tile, img) {
    if (this.turn2) {
      return
    }
    const memBrick = this.shadowRoot.querySelector('.memBrick')
    img.src = '../image/' + tile + '.png'
    img.id = 'img' + tile
    memBrick.id = 'a' + tile

    if (!this.turn1) {
      this.turn1 = img

      this.lastTile = tile
    } else {
      if (img === this.turn1) {
        return
      }
      this.tries += 1
      this.turn2 = img

      if (tile === this.lastTile) {
        this.pairs += 1

        if (this.pairs === (this.cols * this.rows) / 2) {
          this.gameOver()
        }

        window.setTimeout(() => {
          // Hide found pairs
          const imgHide = document.createElement('style')
          this.turn1.parentNode.style.visibility = 'hidden'
          this.turn2.parentNode.style.visibility = 'hidden'

          this.shadowRoot.appendChild(imgHide)

          this.turn1 = null
          this.turn2 = null
        }, 300)
      } else {
        window.setTimeout(() => {
          this.turn1.src = '../image/0.png'
          this.turn2.src = '../image/0.png'

          this.turn1 = null
          this.turn2 = null
        }, 700)
      }
    }
  }

  /**
 * Function to create and shuffle an array to be used in the memory game.
 * @param {Number} this.rows - Number of rows.
 * @param {Number} this.cols - Number of columns.
 */
  getPictureArray () {
    const pictureArray = []

    // Add 2 of each card
    for (let i = 1; i <= (this.rows * this.cols) / 2; i++) {
      pictureArray.push(i)
      pictureArray.push(i)
    }
    // Shuffler
    for (let i = pictureArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pictureArray[i]
      pictureArray[i] = pictureArray[j]
      pictureArray[j] = temp
    }
    return pictureArray
  }

  /**
   * Function to insert result in shadowroot element.
   */
  gameOver () {
    const hTag = document.createElement('h4')
    hTag.innerText = 'You won after ' + this.tries + ' tries!'
    this.shadowRoot.appendChild(hTag)
  }
}

window.customElements.define('memory-app', Memory)
export { Memory }
