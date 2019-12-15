/**
 * @author ph222ue - Patrik Hasselblad
 * @module ./src/js/memory.js
 * @version 1.0
 */

import { NewMemory } from './NewMemory.js'

/* const template = document.createElement('template')
template.innerHTML = `
      <a id="aLink" href="#"><img src="/image/0.png" alt="A memory brick"></a>
 ` */
// <div class="memoryApp"></div>

/**
* Constructs a new Memory game.
* @param {Object} newMemory - Object with parameters of chosen game size.
*/
const boxMenu = document.createElement('template')
boxMenu.innerHTML = `
<div id="topBar"></div>
`

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
  margin: 50px;
  min-width: 150px;
  width: fit-content;  
  height: fit-content;
  background-color: rgb(88, 87, 87);
  border: 2px solid #000;
  box-shadow: 10px 10px 10px;
  display: block;
  float: left;
}
:host img {
  width: 70px;
  position: relative;
  float: left;
}
:host #topBar {
  width: 100%;
  height: 20px;
  background-color: #000;
}

:host button {
  width: 70px;
  height: 70px;
}
</style>
`
// 250px; 350px
class Memory extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(boxMenu.content.cloneNode(true))
    this.temp = document.querySelectorAll('#memoryBox')[0].content.firstElementChild

    this.shadowRoot.appendChild(template.content.cloneNode(true))
    const sizeButton = document.querySelectorAll('#sizeTemplate')[0].content.firstElementChild
    console.log(sizeButton)

    let size = 0

    // User defined game-size
    for (let i = 2; i < 5; i++) {
      sizeButton.id = i
      sizeButton.innerText = (i + ' by ' + i)
      this.buttons = document.importNode(sizeButton, true)
      this.shadowRoot.appendChild(this.buttons)

      this.buttons.addEventListener('click', e => {
        e.preventDefault()
        size = e.target.id
        console.log(size)

        this.newGame = new NewMemory(size, size)
      })
    }

    const memoryBtn = document.querySelector('#memorybtn')
    memoryBtn.addEventListener('click', e => {
      e.preventDefault()
      this.playMemory()
    })
  }

  connectedCallback () {
    this.pairs = 0
    this.tries = 0
    this.turn1 = null
    this.turn2 = null
    this.lastTile = null
  }

  playMemory () {
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

  turnBrick (tile, img) {
    if (this.turn2) {
      return
    }
    const memBrick = this.shadowRoot.querySelector('.memBrick')
    img.src = '../image/' + tile + '.png'
    img.id = 'img' + tile
    console.log(memBrick)

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
          console.log('You won with ' + this.tries + ' number of tries.')
          this.gameOver()

          // Should remove the box ------------------- doesn't really work
          /* const elem = this.shadowRoot.querySelectorAll('.memBrick')
          console.log(elem)
          for (let i = 0; i < elem.length; i++) {
            elem.remove() */
          // }
        }

        window.setTimeout(() => {
          // Hide found pairs
          const bricks = this.turn1.id
          const imgHide = document.createElement('style')
          imgHide.innerHTML = `.memBrick #${bricks} {visibility: hidden;}`
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
        }, 500)
      }
    }
  }
  // }

  /**
 * Function to create and shuffle an array to be used in the memory game.
 * @param {Number} rows - Number of rows.
 * @param {Number} cols - Number of columns.
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

  gameOver () {
    console.log('Game Over!')
    // const game = new Memory()
  }
}
window.customElements.define('memory-app', Memory)
export { Memory }
